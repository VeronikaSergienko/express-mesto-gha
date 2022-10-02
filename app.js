const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.user = {
    _id: '6337fd0ac1b43913c233dd10',
  };
  next();
});

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', require('./routes/users'));
app.use('./cards', require('./routes/cards'));

// app.use('/*', (req, res) => {
//   res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
// });

app.listen(PORT);
