const inquirer = require('inquirer');
const customer = require('./custom_modules/bamazonCustomer');
const manager = require('./custom_modules/bamazonManager');

let start = () => {
    inquirer.prompt({
        type: 'list',
        name: 'role',
        message: 'Who are you?',
        choices: ['customer', 'manager']
    }).then((role) => {
        if (role.role === 'customer') customer();
        if (role.role === 'manager') manager();
    })
};

start();