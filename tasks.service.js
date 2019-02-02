const axios = require('axios');
const validator = require('./tasks.validators');
let fs = require('fs');

const url = 'http://api.quuu.linuxpl.eu/todo/iewuerio';

const createTask = async (description, group) => {
    try {
        let data = await readTasks();
        let max = Math.max.apply(Math, data.map(t => t.id));
        data.push(
            {
                id: data && data.length > 0 ? max + 1 : 0,
                description,
                group,
                complete: false
            }
        );
        return postAndReturnData(data);
    } catch (e) {
        console.error(e);
    }
};

const readTasks = async (complete, group) => {
    try {
        let {data} = await axios.get(url);
        complete = parseComplete(complete);
        if (complete !== undefined) {
            data = data.filter(task => task.complete === complete);
        }
        if (group !== undefined && group.length > 0) {
            data = data.filter(task => task.group.toLowerCase() === group.toLowerCase());
        }
        return writeAndReturnData(data);
    } catch (e) {
        return [];
    }
};

const updateTask = async (id, description, complete, group) => {
    try {
        let data = await readTasks();
        complete = parseComplete(complete);
        validator.validateIdExists(id, data);
        data.filter(task => task.id === id)
            .forEach(task => {
                task.complete = complete !== undefined && complete !== null ? complete : task.complete;
                task.description = description !== undefined && description !== null ? description : task.description;
                task.group = group !== undefined && group !== null ? group : task.group;
            });
        return postAndReturnData(data);
    } catch (e) {
        console.error(e);
    }
};

const deleteTask = async (id) => {
    try {
        let data = await readTasks();
        validator.validateIdExists(id, data);
        data = data.filter(task => task.id !== id);
        data = data.length > 0 ? data : null;
        return postAndReturnData(data);
    } catch (e) {
        console.error(e);
    }
};

const parseComplete = (complete) => {
    if (complete === undefined) {
        return undefined;
    } else {
        return complete.toLowerCase() === 'true';
    }
};

const postAndReturnData = async (data) => {
    await axios.post(url, data);
    return writeAndReturnData(data);
};

const writeAndReturnData = (data) => {
    fs.writeFile('tasks', JSON.stringify(data, null, "\t"), () => {
    });
    return data;
};

module.exports = {createTask, readTasks, updateTask, deleteTask};

