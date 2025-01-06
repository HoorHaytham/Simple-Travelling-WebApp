var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
var app = express();

const { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
const db = client.db('myDB');
//db.collection('myCollection').insertOne({ username: "test", password: "test" });
var session = require('express-session');

app.use(session({
  secret: 'your_favorite_team', // Replace with a strong, unique secret
  resave: false,
  saveUninitialized: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define routes directly in app.js
app.get('/', (req, res) => {
  res.render('login', { error: "" });
});
app.get('/registration', (req, res) => {
  res.render('registration',{ error: '' });
});
app.get('/home',isAuthenticated, (req, res) => {
  res.render('home');
});
app.get('/inca',isAuthenticated,  (req, res) => {
  res.render('inca',{ error: "" });
});
app.get('/incatrailtomachupicchu', isAuthenticated, (req, res) => {
  res.render('inca', { error: "" });
});
app.get('/annapurna',isAuthenticated, (req, res) => {
  res.render('annapurna',{ error: "" });
});
app.get('/annapurnacircuit', isAuthenticated, (req, res) => {
  res.render('annapurna', { error: "" });
});

app.get('/bali',isAuthenticated, (req, res) => {
  res.render('bali',{ error: "" });
});
app.get('/baliisland', isAuthenticated, (req, res) => {
  res.render('bali', { error: "" });
});
app.get('/cities',isAuthenticated, (req, res) => {
  res.render('cities');
});
app.get('/hiking',isAuthenticated, (req, res) => {
  res.render('hiking');
});
app.get('/islands',isAuthenticated, (req, res) => {
  res.render('islands');
});
app.get('/paris',isAuthenticated, (req, res) => {
  res.render('paris',{ error:'' });
});
app.get('/rome',isAuthenticated, (req, res) => {
  res.render('rome',{ error: "" });
});
app.get('/santorini',isAuthenticated, (req, res) => {
  res.render('santorini',{ error:'' });
});
app.get('/santoriniisland',isAuthenticated, (req, res) => {
  res.render('santorini',{ error:'' });
});
app.get('/searchresults',isAuthenticated, (req, res) =>  {
  const searchKey = req.query.searchKey.toLowerCase(); // Convert to lowercase for case-insensitive search
  const destinations = [
      "Inca",
      "Annapurna",
      "Bali",
      "Paris",
      "Rome",
      "Santorini"
  ]; 

  // Filter destinations containing the search key as a substring
  const results = destinations.filter(destination =>
      destination.toLowerCase().includes(searchKey)
  );

  res.render('searchresults', { results });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
app.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.collection('myCollection').findOne({ username, password });

  if (!user) {
    // User does not exist
    return res.render('login', { error: 'Invalid username or password.' });
  }

  if (user.password !== password) {
    // Password mismatch
    return res.render('login', { error: 'Invalid username or password.' });
  }
  req.session.user = username;
  res.redirect('/home'); // Redirect on successful login
});



app.post('/registration', async (req, res) => {
  const { username, password } = req.body;


  const existingUser = await db.collection('myCollection').findOne({ username });
  if (existingUser) {
    return res.render('registration', { error: 'Username already exists.' });
  }
  if (!username || !password) {
    return res.render('registration', { error: 'All fields are required.' });
  }

  await db.collection('myCollection').insertOne({ username, password, wantToGo: [] });
  res.redirect('/');
});

////////////////////////////////////////////////////////
//user session
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    // User is authenticated
    return next();
  } else {
    // Redirect to login if not authenticated
    res.redirect('/');
  }
}



app.get('/wanttogo', isAuthenticated, async (req, res) => {
  const user = await db.collection('myCollection').findOne({ username: req.session.user });
  const wantToGo = user ? user.wantToGo : [];

  console.log("Retrieved wantToGo list:", wantToGo);  
  res.render('wanttogo', { wantToGo, error: '' }); // Default error is empty
});
const destinationViews = {
  "Inca Trail to Machu Picchu": "inca",
  "Annapurna Circuit": "annapurna",
  "Bali Island": "bali",
  "Paris": "paris",
  "Rome": "rome",
  "Santorini Island": "santorini"
};

app.post('/add-to-want-to-go', isAuthenticated, async (req, res) => {
  const { destination } = req.body;
  const user = await db.collection('myCollection').findOne({ username: req.session.user });

  if (user.wantToGo.includes(destination)) {
    const viewName = destinationViews[destination];
    return res.render(viewName, {
      error: 'This destination is already in your Want-to-Go list.'
    });
  }

  await db.collection('myCollection').updateOne(
    { username: req.session.user },
    { $push: { wantToGo: destination } }
  );

  res.redirect(destination);
});
app.post('/search', isAuthenticated, (req, res) => {
  const searchKey = req.body.Search?.toLowerCase() || ''; // Get the search key from the form input
  console.log(req.body)
  const destinations = [
    "Inca Trail to Machu Picchu",
    "Inca",
    "Annapurna",
    "Annapurna circuit",
    "Bali Island",
    "Paris",
    "Rome",
    "Santorini Island"
  ]; 

  // Filter destinations containing the search key as a substring
  const results = destinations.filter(destination =>
    destination.toLowerCase().includes(searchKey)
  );

  console.log(results)

  // Redirect to the search results page with results
  res.render('searchresults', { results });
});


