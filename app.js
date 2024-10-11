var createError = require('http-errors');
require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var empAccountRouter = require('./routes/emproutes');

var app = express();
app.use(cors())

async function main() {
  // const url = 'mongodb+srv://iliyaj:Dd04gLl4ctlSULC5@cluster0.jgt1roc.mongodb.net/EmployeedDetails?retryWrites=true&w=majority';
  // const url ='mongodb+srv://iliyajhushen84:P6i6HLBxYFIKthRT@cluster0.da2ds.mongodb.net/EmployeedDetails?retryWrites=true&w=majority&appName=Cluster0';
  const url = process.env.MONGODB
  await mongoose.connect(url);
}
main().catch(err => console.log(err))

app.get('/', (req, res) => {
  res.status(200).send('Server is up and running');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//empAccountRouter
app.use('/singIn',empAccountRouter);
app.use('/singUp',empAccountRouter)
app.use('/AuthLogin',empAccountRouter)
app.use('/AuthEmail',empAccountRouter)
app.use('/setAuthPassword',empAccountRouter)




//NewEmp
app.use('/newRecord',empAccountRouter)
app.use('/getRecords',empAccountRouter)
app.use('/getSingleEmpRecord',empAccountRouter)
app.use('/updateRecords',empAccountRouter)
app.use('/deleteRecords',empAccountRouter)
app.use('/sendEmail',empAccountRouter)


// app.post('/sendEmail', async (req, res) => {
//   try {
//     const { to, subject, html } = req.body;
//     await sendEmail(to, subject, html);
//     res.status(200).send('Email sent');
//   } catch (error) {
//     res.status(500).send('Error sending email');
//   }
// });


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
