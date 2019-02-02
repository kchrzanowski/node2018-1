const axios = require('axios');
const validator = require('./tasks.validators');
let fs = require('fs');

const url = 'http://api.quuu.linuxpl.eu/todo/iewuerio';

const createTask = async (description, group) => {
    try {
        let {data} = await axios.get(url);
        let id = 0;
        data.forEach(task => {
            if (task.id >= id) {
                id = task.id + 1;
            }
        });
        data.push({id, description, group, complete: false});
        await axios.post(url, data);
        writeData(data);
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
        writeData(data);
        return data;
    } catch (e) {
        return [];
    }
};

const updateTask = async (id, description, complete, group) => {
    try {
        let {data} = await axios.get(url);
        complete = parseComplete(complete);
        validator.validateIdExists(id, data);
        data.filter(task => task.id === id)
            .forEach(task => {
                task.complete = complete !== undefined && complete !== null ? complete : task.complete;
                task.description = description !== undefined && description !== null ? description : task.description;
                task.group = group !== undefined && group !== null ? group : task.group;
            });
        await axios.post(url, data);
        writeData(data);
    } catch (e) {
        console.error(e);
    }
};

const deleteTask = async (id) => {
    try {
        let {data} = await axios.get(url);
        validator.validateIdExists(id, data);
        data = data.filter(task => task.id !== id);
        data = data.length > 0 ? data : null;
        await axios.post(url, data);
        writeData(data);
    } catch (e) {
        console.error(e);
    }
};

function parseComplete(complete) {
    if (complete === undefined) {
        return undefined;
    } else {
        return complete.toLowerCase() === 'true';
    }
}

function writeData(data) {
    fs.writeFile('tasks', JSON.stringify(data, null, "\t"), () => {});
}

module.exports = {createTask, readTasks, updateTask, deleteTask};

