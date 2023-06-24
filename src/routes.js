import { Router } from "express"; 
import UserController from "./controllers/UserController";
import TaskController from "./controllers/TaskController";
import SessionController from "./controllers/SessionController";
import auth from "./middleware/auth";

const routes = new Router();
//Rota de login
routes.post('/sessions', SessionController.create);
//Rota para criar usuário
routes.post('/users', UserController.create)
//Autorização
routes.use(auth)
//Rotas de Usuários
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);
//Rotas de Tarefas
routes.get('/users/:user_id/tasks', TaskController.index);
routes.get('/users/:user_id/tasks/:date_task', TaskController.show);
routes.post('/users/:user_id/tasks', TaskController.create);
routes.delete('/users/:user_id/tasks/:id', TaskController.delete);


export default routes;