/**================================================**/
/**================TODO PROJECT====================**/
/**===============MJE-06/01/2023===================**/
/**================================================**/
const express   = require('express');
const app       = express();
const path      = require('path');
const multer    = require('multer');
const bodyparser= require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(multer().any());
app.use(bodyparser.urlencoded({ extended: true }));

//Setting View Engine
app.set("view engine","pug");

//List all the routers below
const mainRouter = require("./routes/main");

//Use Declared Routes
app.use('/',mainRouter);


app.listen(3001,() => console.log("App is listening on: http://localhost:3001"));