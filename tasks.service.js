const axios = require('axios');
const validator = require('./tasks.validators');

const url = 'http://api.quuu.linuxpl.eu/todo/iewuerio';

const createTask = async (description, group) => {
    try {
        let tasks = await readTasks();
        let id = 0;
        tasks.forEach(task => {
            if (task.id >= id) {
                id = task.id + 1;
            }
        });
        tasks.push({id, description, group, complete: false});
        await axios.post(url, tasks);
    } catch (e) {
        console.error(e);
    }
};

const readTasks = async (complete, group) => {
    try {
        let {data} = await axios.get(url);
        if (complete !== undefined) {
            data = data.filter(task => task.complete === complete);
        }
        if (group !== undefined && group.length > 0) {
            data = data.filter(task => task.group.toLowerCase() === group.toLowerCase());
        }
        return data;
    } catch (e) {
        return [];
    }
};

const updateTask = async (id, description, complete, group) => {
    try {
        let tasks = await readTasks();
        validator.validateIdExists(id, tasks);
        tasks.filter(task => task.id === id)
            .forEach(task => {
                task.complete = complete !== undefined && complete !== null ? complete : task.complete;
                task.description = description !== undefined && description !== null ? description : task.description;
                task.group = group !== undefined && group !== null ? group : task.group;
            });
        await axios.post(url, tasks);
    } catch (e) {
        console.error(e);
    }
};

const deleteTask = async (id) => {
    try {
        let tasks = await readTasks();
        validator.validateIdExists(id, tasks);
        tasks = tasks.filter(task => task.id !== id);
        await axios.post(url, tasks.length > 0 ? tasks : null);
    } catch (e) {
        console.error(e);
    }
};

module.exports = {createTask, readTasks, updateTask, deleteTask};

