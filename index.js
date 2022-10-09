const express = require('express');
const inquirer = require('inquirer');
const db = require('./db/connection');

function confirmContinue() {
    inquirer.prompt(
        {
            name: 'confirm',
            type: 'list',
            messages: 'Would you like to continue',
            choices: ['Y', 'N']
        },
    ).then(answers => {
        if (answers.confirm === 'Y') {
            mainMenu()
        }
        else {
            console.log('Program Ended');
            process.exit()
        }
    })
}

function viewDepartments() {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err,rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        console.table(rows)
        confirmContinue();
    })

};

function viewRoles () {
    const sql = `SELECT * FROM role`;

    db.query(sql, (err,rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        console.table(rows)
        confirmContinue();
    })

};

function viewEmployees() {
    const sql = `SELECT * FROM employee`;

    db.query(sql, (err,rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        console.table(rows)
        confirmContinue();
    })

}

function addDepartments(name) {
    const sql = `INSERT INTO department (name) VALUES (?)`;

    db.query(sql, name, (err, rows) => {
        if (err) {
            console.error(err)
            return;
        }
        console.log('Department added successfully')
        viewDepartments()
        confirmContinue();
    })
}

function addRole(title, salary, department_id) {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

    db.query(sql, [title, salary, department_id], (err, rows) => {
        if (err) {
            console.error(err)
            return;
        }
        console.log('Role added successfully')
        viewRoles()
        confirmContinue();
    })
}

function addEmployee (first_name, last_name, role_id, manager_id) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

    db.query(sql, [first_name, last_name, role_id, manager_id], (err, result) => {
        if (err) {
            console.error(err)
            return;
        }
        console.log('Employee added successfully')
        viewEmployees()
        confirmContinue();
    });
}

function updateEmployee (role_id, id) {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
   
    db.query(sql, [role_id, id], (err, result) => {
        if (err) {
            console.error(err)
            return;
        }
        console.log('Employee updated successfully')
        viewEmployees()
        confirmContinue();
    });

};

function mainMenu() {
    inquirer.prompt(
        {
            name: 'selection',
            type: 'list',
            messages: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 
            'update employee role']
        },
    ).then(answers => {
        console.log(answers)
        switch (answers.selection) {
            case 'view all departments':
                viewDepartments()
                break;
            case 'view all roles':
                viewRoles()
                break;
            case 'view all employees':
                viewEmployees()
                break;
            case 'add a department':
                inquirer.prompt(
                    {
                        name: 'department',
                        type: 'input',
                        message: 'What is the name of the department?',
                    },
                ).then(answers => {
                addDepartments(answers.department)
                });
                break;
            case 'add a role':
                inquirer.prompt([
                    {
                        name: 'title',
                        type: 'input',
                        message: 'What is the position title?',
                    },
                    {
                        name: 'salary',
                        type: 'input',
                        message: 'What is the positions salary?',
                    },
                    {
                        name: 'department_id',
                        type: 'input',
                        message: 'Department Id?',
                    }
                ]).then(answers => {
                addRole(answers.title, answers.salary, answers.department_id)
                });
                break;
            case 'add an employee':
                inquirer.prompt([
                    {
                        name: 'first_name',
                        type: 'input',
                        message: 'What is the first name?',
                    },
                    {
                        name: 'last_name',
                        type: 'input',
                        message: 'What is the last name?',
                    },
                    {
                        name: 'role_id',
                        type: 'input',
                        message: 'Role Id?',
                    },
                    {
                        name: 'manager_id',
                        type: 'input',
                        message: 'Manager Id?',
                    }
                ]).then(answers => {
                    addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id)
                })
                break;
            case 'update employee role':
                inquirer.prompt([
                    {
                        name: 'role_id',
                        type: 'input',
                        message: 'Role Id?',
                    },
                    {
                        name: 'id',
                        type: 'input',
                        message: 'Employee Id?',
                    }
                ]).then(answers => {
                    updateEmployee(answers.role_id, answers.id, )
                })
                break;
        }
    });
}

mainMenu()
