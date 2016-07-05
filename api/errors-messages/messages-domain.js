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
  },
  applications: {
    applicationNameIsRequired: {
      code: 2001,
      message: "O nome da aplicação é obrigatório"
    },
    applicationWithNameAlreadyExists: {
      code: 2002,
      message: "Já existe uma aplicação com o nome informado"
    }
  }
};