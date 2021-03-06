var connect=require('connect');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var mysql = require('mysql');


var formidable = require('formidable');
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  ,fs = require('fs');
//    ,unzip=require('unzip');
var exec = require('child_process').exec;

var multer=require('multer');

var app = express();

// all environments

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
//app.use(express.methodOverride());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
var con = mysql.createConnection({
  host: "tenant-data.cyqm6een8yyy.us-west-2.rds.amazonaws.com",
  user: "root",
  password: "root1234",
  database: "Tenant_DB"
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

var fpath;

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    console.log(__dirname+'/uploads/');
    callback(null, './uploads/');
  },
  filename: function (request, file, callback) {
    console.log(file);
  //  fpath="..\\input\\"+file.originalname.substring(0, file.originalname.lastIndexOf('.'))+"\\anirrudh.jpeg";
	fpath="..\\input\\"+file.originalname.substring(0, file.originalname.lastIndexOf('.'))+"\\diagram.png"; 
//fpath="..\\input\\"+file.originalname.substring(0, file.originalname.lastIndexOf('.'))+"\\testCase4output.png";   
console.log(fpath);


    //fs.createReadStream('./uploads/'+file).pipe(unzip.Extract({ path: './input/'+file.originalname.substring(0, file.originalname.lastIndexOf('.')) }));
    exec('unzip ./public/test4.zip -d ./public/input/'+file.originalname.substring(0, file.originalname.lastIndexOf('.')),function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);

      }
    });


    console.log("after unzipping");
    exec('java -jar "'+__dirname+ '\\classTenant2\\ani.jar" "'+__dirname+'\\public\\input\\'+file.originalname.substring(0, file.originalname.lastIndexOf('.'))+'"', function (error, stdout, stderr) {
      if (stdout !== null) {
        console.log("stdout -> " + stdout);
      }
      //fs.readFile(__dirname+'\\uploads\\example.png',"binary",function (error,file) {
    });


//console.log("path.extname(file)"+path.extname(file));
//fpath='..\\input\\test1\\anirrudh.jpeg';
   callback(null, file.originalname)
//    callback(null, file.originalname+path.extname(file));
  }
});

if ('development' == app.get('env')) {
  //app.use(express.errorHandler());
}

app.get('/tenant1', routes.index);
app.get('/users', user.list);
app.get('/', routes.grader);

var upload = multer(
{ storage: storage }
);

app.post('/fileUpload', upload.single('file'), function(req, res){
  console.log(req.body);
  console.log(req.file);


  console.log('./uploads/');
  //console.log(req.files); // form files
  response = {"statusCode":204,"data":fpath};
  console.log('inside 204');
  res.send((response));

});

app.post('/tenant1/grade', function(req, res){
//var sql= "insert into tenant_data(id,tenant_id,name,column1,column2) values(1,1001,'Tenant1','8','85')";
//con.query(sql, function (err, result) {
  //  if (err) throw err;
    //console.log("1 record inserted");
  //});

  console.log('inside app.js--------'+req.body.data);
	// console.log('inside app.js--------'+req.body);

  //console.log(req.file);


  console.log('./uploads/');
  //console.log(req.files); // form files
  response = {"statusCode":204,"data":fpath};
  console.log('inside 204');
  res.send((response));

});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
