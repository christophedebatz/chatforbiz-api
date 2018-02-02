import * as restify from 'restify';
import UserController from '../controller/UserController';

module.exports.routes = {

  initialize(api:restify.Server) {
    const userController:UserController = new UserController();

    // public resources
    api.post('/users', userController.createUser);
  }

};
