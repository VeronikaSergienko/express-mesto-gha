const mongoose = require('mongoose');
const validator = require('validator');

// const regexp = /^(https?:\/\/)?([\w]{1,32}\.[\w]{1,32})*$/gm;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    // validate: {
    //   validator: (value) => regexp.test(value),
    //   message: ({ value }) => `${value} - некорректная ссылка`,
    // },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: ({ value }) => `${value} - некорректный адрес email`,
    },
    // select: false,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);

// function isValidURL(url) => {
//   const RegExp = /^(https?:\/\/)?([\w]{1,32}\.[\w]{1,32})[^]*$/;

//   if(RegExp.test(url)){
//       return true;
//   }else{
//       return false;
//   }
// }
