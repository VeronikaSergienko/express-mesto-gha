/* eslint-disable no-param-reassign, no-underscore-dangle */
const Cards = require('../models/card');

module.exports.getCard = (req, res) => {
  // найти вообще всех
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при запросе всех карточек' }));
};

module.exports.createCard = (req, res) => {
  // получим из объекта запроса имя и описание пользователя
  const { name, link } = req.body;
  const ownerId = res.user._id;
  console.log(req.user._id); // _id станет доступен
  // создадим документ на основе пришедших данных
  Cards.create({ name, link, owner: ownerId })
  /* напишите код здесь */
    .then((card) => res.send({ data: card }))
    // данные не записались, вернём ошибку
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.likeCard = (req, res) => Cards.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
);

module.exports.dislikeCard = (req, res) => Cards.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
);
