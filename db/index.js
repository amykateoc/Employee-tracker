const { createPromptModule } = require('inquirer');
const connection = require('./connection');

module.exports = {
    findEmployees() {
        return connection.promise().query('SELECT * FROM employee')
    },
    createEmployee(employee) {
        return connection.promise().query('INSERT INTO employee SET ?', employee);
    },
    findRoles() {
        return connection.promise().query('SELECT * FROM role')
    },
    findDepartment() {
        return connection.promise().query('SELECT * FROM department')
    },
    createRole(role) {
        return connection.promise().query('INSERT INTO role SET ?', role)
    },
    createDepartment(department) {
        return connection.promise().query('INSERT INTO department SET ?', department)
    }
}
