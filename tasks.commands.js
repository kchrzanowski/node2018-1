const {createTask, readTasks, updateTask, deleteTask} = require('./tasks.service');

const createTaskCommand = {
    command: 'create',
    describe: 'Creates new task',
    function (yargs) {
        return yargs.option('b', {
            alias: 'bar'
        })
    },
    handler: async args => {
        try {
            await createTask(args.description, args.group);
            let tasks = await readTasks();
            console.log(tasks);
        } catch (error) {
            console.log(error.message);
        }
    }
};

const readTasksCommand = {
    command: 'read',
    describe: 'Returns list of tasks',
    handler: async args => {
        try {
            let tasks = await readTasks(args.complete, args.group);
            console.log(tasks);
        } catch (error) {
            console.log(error.message);
        }
    }
};

const updateTaskCommand = {
    command: 'update',
    describe: 'Updates task',
    handler: async args => {
        try {
            await updateTask(args.id, args.description, args.complete, args.group);
            let tasks = await readTasks();
            console.log(tasks);
        } catch (error) {
            console.log(error.message);
        }
    }
};

const deleteTaskCommand = {
    command: 'delete',
    describe: 'Deletes task',
    handler: async args => {
        try {
            await deleteTask(args.id);
            let tasks = await readTasks();
            console.log(tasks);
        } catch (error) {
            console.log(error.message);
        }
    }
};

module.exports = [createTaskCommand, readTasksCommand, updateTaskCommand, deleteTaskCommand];
