require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const {
    findEmployees
} = require('./db')

const mainQuestion = ([
    {
        message: 'What would you like to do?',
        type: 'list',
        name: 'navigation',
        choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments', 'Add department']
    }
]);

function addEmployee() {
    findEmployees()
    .then(([employeeData]) => {
        console.log(employeeData)
const employeeChoices = employeeData.map(eachEmployee => ({
    name: eachEmployee.first_name + ' ' + eachEmployee.last_name,
    value: eachEmployee.id
}))

console.log(employeeChoices)

const addEmployeeQuestions = ([
    {
        message: 'What is the first name?',
        type: 'input',
        name: 'first_name',
    },
    {
        message: 'What is the last name?',
        type: 'input',
        name: 'last_name'
    },
    {
        message: 'What is the employees role?',
        type: 'list',
        choices: [''],
        name: 'role_id'
    },
    {
        message: 'Who is their manager?',
        type: 'list',
        choices: employeeChoices,
        name: 'manager_id'
    }
])
inquirer.prompt(addEmployeeQuestions)
.then((answers) => {
    console.log(answers)
    createEmployee(answers)
    .then (() => initialQuestion())
})
})
}

function initialQuestion() {
    inquirer.prompt(mainQuestion)
    .then ((answers) => {
        switch(answers.navigation) {
            case "View all employees":
                viewEmployees();
                break;
            case "Add employee":
                addEmployee();
                break;
            case "":

            break
        }
    })
};

function init() {
console.log('Welcome to the Employee Tracker')
initialQuestion()
};

init();