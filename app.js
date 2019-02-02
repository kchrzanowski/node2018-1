const yargs = require('yargs');

const tasksCommands = require('./tasks.commands');

tasksCommands.forEach(command => yargs.command(command));

yargs.help()
    .group('description', `'create' options`)
    .describe('description', 'Sets description of task')
    .group('group', `'create' options`)
    .describe('group', 'Sets group of task')

    .group('complete', `'read' options`)
    .describe('complete', 'Returns filtered true/false complete tasks')
    .group('group', `'read' options`)
    .describe('group', 'Returns filtered tasks by group')

    .group('id', `'update' options`)
    .describe('id', 'id of updating task')
    .group('description', `'update' options`)
    .describe('description', 'Sets description of task')
    .group('complete', `'update' options`)
    .describe('complete', 'Sets completion of task')
    .group('group', `'update' options`)
    .describe('group', 'Sets group of task')

    .group('id', `'delete' options`)
    .describe('id', 'Id of deleting task')

    .wrap(null)
    .argv;
