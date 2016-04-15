const messages = {
  generic: {
    login: "Login",
    register: "Registrar",
    logoff: "Sair",
    isAuthenticated: "Autenticado",
    guest: "Visitante",
    welcome: "Bem Vindo!"
  },
  navBar: {
    brand: "TodoApp"
  },
  footer: {
    message: "Copyright &copy; PerfectTodos.com"
  },
  info: {
    message: "INFO"
  },
  settings: {
    message: "Settings"
  },
  errors: {
    authentication: {
      usernameAndPasswordRequired: "O nome de usuário e a senha são obrigatórios.",
      usernameMustBeEmail: "O nome do usuário deve ser um e-mail"
    },
    generic: {
      isRequired: "O campo é obrigatório.",
      getIsRequiredError: function (field) {
        return "O {0} é obrigatório".format(field || "campo");
      }
    }
  }
};

module.exports = messages;