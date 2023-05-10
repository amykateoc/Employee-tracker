const connection = require('./connection')

module.exports = {
    findEmployees() {
        return connection.promise().query('SELECT * FROM employee')
    },
    createEmployee(employee) {
        return connection.promise().query('INSERT INTO employee SET ?', employee);
    }
}
