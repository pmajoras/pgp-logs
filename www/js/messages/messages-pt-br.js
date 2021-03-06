const messages = {
  generic: {
    login: 'Login',
    register: 'Registrar',
    logoff: 'Sair',
    isAuthenticated: 'Autenticado',
    guest: 'Visitante',
    welcome: 'Bem Vindo!',
    save: 'Salvar',
    loading: 'Carregando',
    showing: 'Exibindo',
    error: 'There was an error on performing the action. Please contact administration if it persists.'
  },
  actionToolbar: {
    addTooltip: '',
    editTooltip: 'Editar registro!',
    deleteTooltip: 'Excluir registro!'
  },
  navBar: {
    brand: 'TodoApp'
  },
  footer: {
    message: 'Copyright &copy; PerfectTodos.com'
  },
  info: {
    message: 'INFO'
  },
  settings: {
    message: 'Settings'
  },
  authentication: {
    headerLabel: 'Autenticação',
    usernameLabel: 'Email',
    passwordLabel: 'Senha'
  },
  applicationsEdit: {
    nameLabel: 'Aplicação',
    appIdLabel: 'ID',
    logPatternLabel: 'Expressão',
    descriptionLabel: 'Descrição'
  },
  errors: {
    authentication: {
      usernameAndPasswordRequired: 'O nome de usuário e a senha são obrigatórios.',
      usernameMustBeEmail: 'O nome do usuário deve ser um e-mail',
    },
    generic: {
      _field: 'campo',
      _isRequired: 'O {0} é obrigatório.',
      _minLength: 'O {0} deve ter no mínimo {1} caractér(es).',
      _maxLength: 'O {0} deve ter no máximo {1} caractér(es).',
      isRequiredError: function (field) {
        return this._isRequired.format(field || this._field);
      },
      MinLengthError: function (minLength, field) {
        return this._minLength.format(field || this._field, minLength || 0);
      },
      MaxLengthError: function (maxLength, field) {
        return this._maxLength.format(field || this._field, maxLength || 0);
      }
    }
  }
};

module.exports = messages;
