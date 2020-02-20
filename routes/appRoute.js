var express = require('express')
var app = express()
const Employee = require('../src/employee/employeeController')
const employee = new Employee()

// SHOW LIST OF employee
app.get('/', employee.getAllEmployee)

// SHOW ADD employee FORM
app.get('/add',employee.showAddEmployeeForm)

// ADD NEW employee POST ACTION
app.post('/add',employee.addNewEmployee)

// SHOW EDIT employee FORM
app.get('/edit/(:id)', employee.showEditEmployee)

// EDIT employee POST ACTION
app.put('/edit/(:id)',employee.editEmployee)

// DELETE employee
app.delete('/delete/(:id)', employee.deleteEmployee)

// Show search employee form
app.get('/search', employee.showSearchEmployeeForm)

// Search employee action
app.post('/search',employee.searchEmployeeBySalary)

module.exports = app
