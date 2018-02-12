import * as restify from 'restify';
import * as socketIo from 'socket.io';
import UserController from '../controller/UserController';
import MessageController from '../controller/MessageController';
import MessageDto from '../model/dto/MessageDto';
import ActionDto from '../model/dto/ActionDto';

module.exports.routes = {

  initialize: (api:restify.Server):void => {
    const userController:UserController = new UserController();
    const messageController:MessageController = new MessageController();

    // handle rest resources
    api.post('/users', userController.createUser);
    api.get('/me', userController.fetchMe);
    api.del('/me', userController.removeMe);
    api.get('/messages', messageController.fetchLastMessages);

    // handle realtime resources
    const handlers:[{ key: string, do:(m: any) => Promise<any> }] = [
      { key: 'message', do: messageController.onReceiveMessage },
      { key: 'action', do: messageController.onReceiveAction }
    ];

    handleSocketRequest(api, handlers);
  }
}

const handleSocketRequest = (api:restify.Server, handlers:[{ key: string, do:(m: any) => Promise<any> }]):void => {
  const io:SocketIO.Server = socketIo.listen(api.server);

  io.on('connect', (socket: any) => {
    for (let i = 0; i < handlers.length; i++) {
      socket.on(handlers[i].key, (message:any) => {
        handlers[i].do(message)
          .then(response => io.emit(handlers[i].key, response))
      });
    }
    socket.on('disconnect', () => {
       console.log('Client disconnected');
    });
  });
}
