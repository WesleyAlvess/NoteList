const express = require("express");
const routes = express.Router();
const UserController = require("../Controller/UserController");
const TaskController = require("../Controller/TaskController");
const authMidlle = require("../middleware/globalMiddle")

// Renderiza o formulário de login
routes.get("/login", UserController.showLoginForm);
// Renderiza o formulário de registro
routes.get("/register", UserController.showRegisterForm);
// Renderiza a página de tarefas
// routes.get("/tasks", TaskController.showTasksPage);


// Manipula o envio do formulário de registro
routes.post("/register", UserController.register);
routes.post("/login", UserController.login)

//Rotas de tarefas
routes.get('/tasks', authMidlle,  TaskController.getAllTasks)
routes.post('/create', TaskController.createTask)
routes.get('/getById/:id', TaskController.getById)
routes.post('/update/:id', TaskController.update)
routes.get('/deleteTask/:id', TaskController.deleteTask)



module.exports = routes;        
