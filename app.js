const express = require('express');
const bodyParser = require('body-parser');
const {
  celebrate, Joi, errors,
} = require('celebrate');
const mongoose = require('mongoose');
const path = require('path');
const auth = require('./middlewares/auth');
const {
  login, createUser,
} = require('./controllers/users');

const { regExpURL } = require('./utils/constants');

const { errorsHandler } = require('./middlewares/errorsHandler');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
const NotFound = require('./errors/NotFound');

app.use(express.static(path.join(__dirname, 'public')));

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regExpURL),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

// авторизация
app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/*', (req, res, next) => {
  next(new NotFound('Запрашиваемый ресурс не найден'));
});

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use(errorsHandler);

app.listen(PORT);
