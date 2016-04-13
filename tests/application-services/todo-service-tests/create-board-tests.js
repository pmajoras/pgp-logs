"use strict";

var common = require("../../common");
var assert = common.assert;

var TodoService = require('../../../application-services/todo-service');
var UserService = require('../../../domain/services/users/user-service');
var target = new TodoService();
var userService = new UserService();
var createdUser = null;

before(function(done) {

  userService.save({ username: "teste@teste22.com", password: "123456" })
    .then((data) => {
      assert.isOk(data);
      createdUser = data;
      done();
    }, (err) => {
      done(err);
    });
});

it("should create a valid board.", function(done) {
  target.createBoard(createdUser._id, "Quadro Teste", "Descrição teste.")
    .then((newBoard) => {
      assert.equal("Quadro Teste", newBoard.name);
      assert.equal("Descrição teste.", newBoard.description);
      done();
    }, (err) => {
      done(err);
    });
});

it("should not create a board with null name.", function(done) {
  target.createBoard(createdUser._id, null, "Descrição teste.")
    .then(() => {
      done("should not create a board with null name.");
    }, (err) => {
      assert.equal('Specification', err.type);
      done();
    });
});

it("should not create a board with undefined name.", function(done) {
  target.createBoard(createdUser._id, undefined, "Descrição teste.")
    .then(() => {
      done("should not create a boar with undefined name.");
    }, (err) => {
      assert.equal('Specification', err.type);
      done();
    });
});

it("should not create a board with invalid ownerId.", function(done) {
  target.createBoard(null, "Teste teste", "Descrição teste.")
    .then(() => {
      done("should not create a board with invalid ownerId.");
    }, (err) => {
      assert.equal('Specification', err.type);
      done();
    });
});

after(function(done) {
  common.mongoose.connection.db.dropDatabase(function(err) {
    done(err);
  });
});