const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3500;

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login', { errorMessage: '' });
});

app.post('/login', (req, res) => {
  //   res.render('register');
  const users = [
    { username: 'John', password: 'password123', role: 'admin' },
    { username: 'Mary', password: 'password456', role: 'editor' },
    { username: 'Peter', password: 'password789', role: 'editor' },
    { username: 'Anna', password: 'password012', role: 'reader' },
  ];

  let { username, password } = req.body;
  let user = users.find((user) => user.username === username && user.password === password);
  if (user) {
    res.render('profile', { name:user.username, username:username });
  } else {
    res.render('login', { errorMessage: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is http://localhost:${port}`);
});