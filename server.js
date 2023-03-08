const mysql = require('mysql2');
const express = require('express');
const app = express();
const inquirer = require('inquirer');
const PORT = process.env.PORT || 3001;
require('console.table');
app.use(express.urlencoded({extended: false}))
app.use(express.json())

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '122702Ij!',
      database: 'company_db'
    },
    console.log(`Connected to the employee database.`)
);


// db.connect(async function () {
//     startApp();
// });


function startApp() {

  inquirer.prompt([
    {
      type: 'list',
      name: 'options',
      message: "select an option to get started",
      choices: [
        'viewEmployees',
        'View-Roles',
        'View-Department',
        'add-employee',
        'add-role',
        'add-department',
        'quit'
      ]
    }

  ])

  .then((anwsers) => {
    console.log('user selected ' + anwsers.options)
    let choices = anwsers.options 
    switch (choices) {
      case 'viewEmployees': 
      viewAllEmployees();
      break;
      case 'View-Roles': 
      viewAllRoles();
      break;
      case 'View-Department': 
      viewAllDepartment();
      break;
      case 'add-employee': 
      addEmployee();
      break;
      case 'add-role': 
      addRole();
      break;
      case 'add-department': 
      addDepartment();
      break;
      case 'quit':
      quit()
      break;
      default: 
      console.log("something went wrong");
      break;
    }
  })

}

  function viewAllEmployees() {
    db.query('SELECT * FROM employees', function(err, results){
      (err)? console.log(err,"error"): console.table(results), startApp()
    })
  }

  function viewAllRoles() {
    db.query('SELECT * FROM roles', function(err, results){
      (err)? console.log(err,"error"): console.table(results), startApp()
    })
  }

  function viewAllDepartment() {
    db.query('SELECT * FROM department', function(err, results){
      (err)? console.log(err,"error"): console.table(results), startApp()
    })
  }

  function addEmployee() {
    inquirer.prompt ([
      {
        type: 'input',
        message: 'Enter the new employees first name:',
        name: 'first_name'
      },
      {
        type: 'input',
        message: 'Enter new employees last name:',
        name: 'last_name'
      },
      {
        type:'input',
        message: 'enter new employees rolesId',
        name: 'roles_id'
      },
      {
        type:'input',
        message: 'enter employees managerID',
        name: 'manager_id'
      }

    ])

    .then((answers) => {
      db.query('INSERT INTO employees(first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)',
      [answers.first_name, answers.last_name, answers.roles_id, answers.manager_id], function (err, result){
        if (err) {
          console.log(err, "error");
        } else {
          console.table(result);
          startApp();
        }
      });
    });
    
  }

  function quit() {
    console.log("Exiting application...")
    process.exit();
  }

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })

  startApp();