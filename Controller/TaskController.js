const mongoose = require("mongoose")
const Task = require("../models/Task")


const getAllTasks = async (req, res) => {
    try {
        // Pegando lista de tarefas no banco de dados
        const taskList = await Task.find()

        // Renderizando elas na tela tasks
        return res.render("tasks", { task: null, taskList, message: "", type: "" })


    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const createTask = async (req, res) => {
    try {
        const task = req.body

        if (!task.task) {
            return res.render("tasks", {
                task: null,
                taskList: await Task.find(),
                message: "Insira um texto, antes de adicionar a tarefa!",
                type: "danger"

            })
        }

        await Task.create(task)

        res.render("tasks", {
            task: null,
            taskList: await Task.find(),
            message: "Tarefa adicionada com sucesso!",
            type: "success"
        })


    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const getById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id })
        const taskList = await Task.find()

        res.render("tasks", { task, taskList, message: "", type: "" })


    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const update = async (req, res) => {
    try {
        const task = req.body

        await Task.updateOne({ _id: req.params.id }, task)


        res.render("tasks", {
            task: null,
            taskList: await Task.find(),
            message: "Tarefa atualizada com sucesso!",
            type: "success"
        })


    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task.deleteOne({ _id: req.params.id })

        if (task) {
            res.render("tasks", {
                task: null,
                taskList: await Task.find(),
                message: "Tarefa apagada com sucesso!",
                type: "success"
            })
        }

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}


module.exports = {
    getAllTasks,
    createTask,
    getById,
    update,
    deleteTask,
};
