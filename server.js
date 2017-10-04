const express = require('express');
const app = express();
const path = require('path');
// import './data';


// const middlewareFuncName = (request, response, next) => {
//   // Middleware code to run here
//
//   // Move on to next middleware fx or the route handler
//   next();
// };

const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url);
  next();
}

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next();
}

// this configures our entire application to use these two middleware functions
// they can now be removed from the route handler
app.use(urlLogger, timeLogger)

// app.use() configures the app to use a middleware fx... for every request to the server, always run the fx passed into app.use()
app.use(express.static(path.join(__dirname, 'public')));
// for every request to the server, make sure to use the specified path as a starting point for all static asset files

// app.use('/sunsets', express.static(path.join(__dirname, 'public/images')))


// the first argument in this fx is the route path
// the second argument is a callback fx that takes a request object and a response object
app.get('/', (request, response) => {
  response.send('hello world')
});

app.get('/sunsets', (request, response) => {
  response.sendFile('/Users/christielynam/turing/mod4/prework/express-tutorial/public/images/Last-Sunset.png')
});

// app.get('/sunsets', (request, response) => {
//   response.render('images')
// });

app.get('/json', (request, response) => {
  // Respond with JSON data here
  response.status(200).json({"name": "Christie"})
})

app.get('/json', (request, response) => {
  response.status(200).json(require('./data'))
})


// this fx tells the server to start listening for connections on port 3000
app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});

app.use((request, response, next) => {
  response.status(404).send("import custom 404 error page here")
})
