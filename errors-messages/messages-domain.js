"use strict";


module.exports = {
  users: {
    usernameMustBeAnEmail: {
      code: 1001,
      message: "O nome de usuário deve ser um e-mail válido."
    },
    usernameWithEmailAlreadyExists: {
      code: 1002,
      message: "Já existe um usuário com o e-mail informado."
    },
    invalidPassword: {
      code: 1003,
      message: "A senha é obrigatória e deve ter no minímo 6 caractéres."
    }
  }
};