const { createPromptModule } = require('inquirer');
const connection = require('./connection');

module.exports = {
    findEmployees() {
        return connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;")
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
    },
    updateEmployeeRole(employee) {
        return connection.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [employee.roles, employee.employees])
    }
}
