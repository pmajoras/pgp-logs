const messages = {
  generic: {
    login: "Login",
    register: "Registrar",
    logoff: "Sair",
    isAuthenticated: "Autenticado",
    guest: "Visitante",
    welcome: "Bem Vindo!",
    save: "Salvar",
    loading: "Carregando"
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
  authentication: {
    usernameLabel: "Email",
    passwordLabel: "Senha"
  },
  registerUser: {
    usernameLabel: "Email",
    passwordLabel: "Senha",
    repeatPasswordLabel: "Repetir a senha"
  },
  errors: {
    authentication: {
      usernameAndPasswordRequired: "O nome de usuário e a senha são obrigatórios.",
      usernameMustBeEmail: "O nome do usuário deve ser um e-mail",
      passwordMustRepeat: "A senha deve ser a mesma digitada anteriormente."
    },
    generic: {
      _field: "campo",
      _isRequired: "O {0} é obrigatório.",
      _minLength: "O {0} deve ter no mínimo {1} caractér(es).",
      _maxLength: "O {0} deve ter no máximo {1} caractér(es).",
      IsRequiredError: function (field) {
        return this._isRequired.format(field || _field);
      },
      MinLengthError: function (minLength, field) {
        return this._minLength.format(field || _field, minLength || 0);
      },
      MaxLengthError: function (maxLength, field) {
        return this._maxLength.format(field || _field, maxLength || 0);
      }
    }
  }
};

module.exports = messages;