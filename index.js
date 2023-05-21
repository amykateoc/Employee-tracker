require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const {
    findEmployees,
    findRoles,
    findDepartment,
    createDepartment,
    createRole,
    createEmployee,
    updateEmployeeRole
} = require('./db')

const mainQuestion = ([
    {
        message: 'What would you like to do?',
        type: 'list',
        name: 'navigation',
        choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add a role', 'View all departments', 'Add a department']
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
            if (!employeeChoices.length) {
                employeeChoices.push({ name: 'No employees to choose from', value: null })
            }

            findRoles()
                .then(([roleData]) => {
                    const roleChoices = roleData.map(eachRole => ({
                        name: eachRole.title,
                        value: eachRole.id
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
                            choices: roleChoices,
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
                                .then(() => initialQuestion())
                        })
                })
        })
};

function addRole() {
    findDepartment()
        .then(([deptData]) => {
            console.log(deptData)
            const deptChoices = deptData.map(eachDept => ({
                name: eachDept.name,
                value: eachDept.id
            }))

            console.log(deptChoices)

            const addRoleQuestions = ([
                {
                    message: 'What is the title of the role?',
                    type: 'input',
                    name: 'title',
                },
                {
                    message: 'What is the salary?',
                    type: 'input',
                    name: 'salary'
                },
                {
                    message: 'What is the department?',
                    type: 'list',
                    choices: deptChoices,
                    name: 'department_id'
                }
            ])
            inquirer.prompt(addRoleQuestions)
                .then((answers) => {
                    console.log(answers)
                    createRole(answers)
                        .then(() => initialQuestion())
                })
        })
};

function addDepartment() {
    findDepartment()
        .then(([deptData]) => {
            console.log(deptData)

            const addDeptQuestions = ([
                {
                    message: 'What is the name of the department?',
                    type: 'input',
                    name: 'name',
                }
            ])
            inquirer.prompt(addDeptQuestions)
                .then((answers) => {
                    console.log(answers)
                    createDepartment(answers)
                        .then(() => initialQuestion())
                })
        })
};

function viewEmployees() {
    findEmployees()
        .then(([employeeData]) => {
            console.log(employeeData)
            initialQuestion()
        })
};

function viewRoles() {
    findRoles()
        .then(([roleData]) => {
            console.log(roleData)
            initialQuestion()
        })
};

function viewDepartments() {
    findDepartment()
        .then(([departmentData]) => {
            console.log(departmentData)
            initialQuestion()
        })
};

function updateEmployee() {
    findEmployees()
    .then(([employeeData]) => {
        console.log(employeeData)
        const employeeChoices = employeeData.map(eachEmployee => ({
            name: eachEmployee.first_name + ' ' + eachEmployee.last_name,
            value: eachEmployee.id
        }))
        if (!employeeChoices.length) {
            employeeChoices.push({ name: 'No employees to choose from', value: null })
        }
    findRoles()
        .then(([roleData]) => {
            const roleChoices = roleData.map(eachRole => ({
                name: eachRole.title,
                value: eachRole.id
            }))
            const updateQuestions = ([
                {
                    message: "Which employee would you like to update?",
                    type: 'list',
                    choices: employeeChoices,
                    name: 'employees'
                },
                {
                    message: "What is the employee's new role?",
                    type: 'list',
                    choices: roleChoices,
                    name: 'roles'
                }
            ])
            inquirer.prompt(updateQuestions)
                .then((answers) => {
                    console.log(answers)
                    updateEmployeeRole(answers)
                        .then(() => initialQuestion())
                })
        })
    })
};

function initialQuestion() {
    inquirer.prompt(mainQuestion)
        .then((answers) => {
            switch (answers.navigation) {
                case "View all employees":
                    viewEmployees();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "Update employee role":
                    updateEmployee();
                    break;
                case "View all roles":
                    viewRoles();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "View all departments":
                    viewDepartments();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "I'm done":
                    console.log('Goodbye')
                    process.exit(0)
            }
        })
};

function init() {
    console.log('Welcome to the Employee Tracker')
    initialQuestion()
};

init();