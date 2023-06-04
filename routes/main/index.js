const express       = require('express');
const router        = express.Router();
const path          = require('path');
const fs            = require('fs');
const mysqllib      = require(path.join(__dirname,'../../api/database/mysql'));

router.get('/',async (req,res,next) => {

    var {deleted} = req.query;
    try {
        let checkcon = await mysqllib.check();
        if(checkcon == "DISCONNECTED") throw checkcon.error
        res.render("main/index",{deleted:deleted??0});
    } catch (error) {
        console.log(error);
        res.render("main/index",{error:'config'});
    }

});

router.get('/config', (req, res) => {
    const config = JSON.parse(fs.readFileSync('./config.json'));
    res.render('main/config', { config });
});
  
// Route to handle configuration updates
router.post('/config',async (req, res) => {

    if(!req.body) return res.send({error:'INVALID REQUEST PARAMETERS!'});
    let{dbhost,dbuser,dbpassword} = req.body;
    try {

        dbhost      = dbhost.trim();
        dbuser      = dbuser.trim();
        dbpassword  = dbpassword.trim();
        //fetch the json from file
        const config = JSON.parse(fs.readFileSync('./config.json'));

        config.dbhost     = dbhost ?? config.dbhost;
        config.dbuser     = dbuser ?? config.dbuser;
        config.dbpassword = dbpassword ?? config.dbpassword;

        fs.writeFileSync('./config.json', JSON.stringify(config, null, 2));

        res.send({result:"OK"});

    } catch (error) {
        console.error('Error executing function:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});

router.post('/add', async (req,res,next) => {

    if(!req.body) return res.send({error:'INVALID REQUEST PARAMETERS!'});
  
    let {txtTaskTitle,txtTaskDesc,selTaskStatus}=req.body;

    try {
        //QUERY ALL DATA
        const queryResult = await mysqllib.runQuery(req,res,next,
          'INSERT INTO tasks (title, description, status, createdate) VALUES (?,?,?,NOW())',
          [txtTaskTitle,txtTaskDesc, selTaskStatus]
        );

        if(queryResult.error) throw queryResult.error;

        res.send({result:'OK'});

    } catch (error) {

        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
});

router.post('/edit', async (req,res,next) => {
    if(!req.body) return res.send({error:'INVALID REQUEST PARAMETERS!'});
  
    let {txtEditTaskTitle,txtEditTaskDesc,selEditTaskStatus,id}=req.body;

    try {
        //QUERY ALL DATA
        const queryResult = await mysqllib.runQuery(req,res,next,
          'UPDATE tasks set title = ?, description = ?, status = ?, modifieddate = NOW() WHERE id = ?',
          [txtEditTaskTitle,txtEditTaskDesc, selEditTaskStatus,id]
        );

        if(queryResult.error) throw queryResult.error;

        res.send({result:'OK'});

    } catch (error) {

        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
});

router.post('/restore', async (req,res,next) => {

    if(!req.body) return res.send({error:'INVALID REQUEST PARAMETERS!'});
  
    let {id}=req.body;

    try {
        //QUERY Update
        let queryResult  = await mysqllib.runQuery(req,res,next,
            'UPDATE tasks set deleted = 0, modifieddate = NOW() WHERE id = ?',
            [id]
            );
        
        if(queryResult.error) throw queryResult.error;

        res.send({result:'OK'});

    } catch (error) {

        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
});

router.post('/delete', async (req,res,next) => {

    if(!req.body) return res.send({error:'INVALID REQUEST PARAMETERS!'});
  
    let {id,type}=req.body;

    try {
        //QUERY ALL DATA
        let queryResult = ''
        if(type == 'HARD'){
            queryResult = await mysqllib.runQuery(req,res,next,
            'DELETE FROM tasks WHERE id = ?',
            [id]
            );
        }else if(type == 'SOFT'){
            queryResult = await mysqllib.runQuery(req,res,next,
                'UPDATE tasks set deleted = 1, deleteddate = NOW() WHERE id = ?',
                [id]
              );
        }else{
            res.status(500).json({ error: 'Invalid Type of Deletion' });
        }
        
        if(queryResult.error) throw queryResult.error;

        res.send({result:'OK'});

    } catch (error) {

        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
});

router.post('/getRows', async (req,res,next) => {

    if(!req.body) return res.send({error:'INVALID REQUEST PARAMETERS!'});
    
    let {pageCount,selStatusFilter,selItemsPerPage,deleted}=req.body;
    
    const page      = parseInt(pageCount) || 1;
    const limit     = parseInt(selItemsPerPage) || 5;
    const offset    = (page - 1) * limit;

    try {
        //QUERY ALL DATA

        const queryCount = await mysqllib.runQuery(req,res,next,
          'SELECT COUNT(*) as total FROM tasks WHERE status like ? AND deleted = ? ',[selStatusFilter,deleted]
        );

        const totalTasks = queryCount[0].total;
        const lastPage = Math.ceil(totalTasks / limit);

        const queryResult = await mysqllib.runQuery(req,res,next,
          'SELECT * FROM tasks WHERE status like ? AND deleted = ? LIMIT ? OFFSET ? ',
          [selStatusFilter,deleted,limit, offset]
        );

        if(queryResult.error) throw queryResult.error;

        res.send({result:queryResult,lastPage:lastPage});

    } catch (error) {

        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });

    }

});

module.exports = router;