import createError from'http-errors'
import express from'express'
import path from'path'
import cookieParser from'cookie-parser'
import logger from'morgan'
import db from "./apps/index.js"
import cors from "cors"

import indexRouter from'./routes/index.js'
import usersRouter from'./routes/users.js'



var app = express();
app.use(cors())

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
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
db.sequelize.sync({force: true})
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.listen(3000, () => {
  console.log(`[server]: Server is running at https://localhost:${3000}`);
});

