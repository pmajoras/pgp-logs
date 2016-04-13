"use strict";
var localforage = require('localforage');

// Configuração do localForage
localforage.config({
  driver: localforage.WEBSQL,
  name: 'storage',
  version: 1.0,
  size: 4980736, // Tamanho em bytes (only for WEBSQL)
  storeName: 'keyvaluepairs',
  description: 'storage description'
});

module.exports = localStorage;