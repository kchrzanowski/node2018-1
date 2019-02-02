const yargs = require('yargs');

const tasksCommands = require('./tasks.commands');

tasksCommands.forEach(command => yargs.command(command));

yargs.help()
    .group('description', 'create')
    .describe('description', 'Sets description of task')
    .group('group', 'create')
    .describe('group', 'Sets group of task')

    .group('complete', 'read')
    .describe('complete', 'Returns filtered true/false complete tasks')
    .group('group', 'read')
    .describe('group', 'Returns filtered tasks by group')

    .group('id', 'update')
    .describe('id', 'id of updating task')
    .group('description', 'update')
    .describe('description', 'Sets description of task')
    .group('complete', 'update')
    .describe('complete', 'Sets completion of task')
    .group('group', 'update')
    .describe('group', 'Sets group of task')

    .group('id', 'delete')
    .describe('id', 'Id of deleting task')

    .wrap(null)
    .argv
