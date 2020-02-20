const EmployeeValidator = require('../requestValidator/employeeValidator')
const employeeValidate = new EmployeeValidator()

function trimBody(reqBody) {
    return {
        name: reqBody.sanitize('name').escape().trim(),
        email: reqBody.sanitize('email').escape().trim(),
        salary: reqBody.sanitize('salary').escape().trim()
    }
}

class Employee {

    getAllEmployee(req, res, next) {
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM employee ORDER BY id DESC', (err, rows, fields) => {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    res.render('employee/list', {
                        title: 'employee List',
                        data: ''
                    })
                } else {
                    res.render('employee/list', {
                        title: 'Employee List',
                        data: rows
                    })
                }
            })
        })
    }

    showAddEmployeeForm(req, res, next) {
        res.render('employee/add', {
            title: 'Add New employee',
            name: '',
            email: '',
            salary: ''
        })
    }

    addNewEmployee(req, res, next) {
        const validateRequest = employeeValidate.addNewEmployeeValidator(req, res, next)
        if (validate) {
            return validateRequest
        } else {
            const employee = trimBody(req)
            req.getConnection(function (error, conn) {
                conn.query('INSERT INTO employee SET ?', employee, function (err, result) {
                    //if(err) throw err
                    if (err) {
                        req.flash('error', err)
                
                        res.render('employee/add', {
                            title: 'Add New employee',
                            name: employee.name,
                            email: employee.email,
                            salary: employee.salary
                        })
                    } else {
                        req.flash('success', 'Data added successfully!')

                        res.render('employee/add', {
                            title: 'Add New employee',
                            name: '',
                            email: '',
                            salary: ''
                        })
                    }
                })
            })
        }
    }

    showEditEmployee(req, res, next) {
        req.getConnection(function (error, conn) {
            conn.query('SELECT * FROM employee WHERE id = ?', [req.params.id], function (err, rows, fields) {
                if (err) throw err

                // if employee not found
                if (rows.length <= 0) {
                    req.flash('error', 'employee not found with id = ' + req.params.id)
                    res.redirect('/employee')
                } else { // if employee found
                    res.render('employee/edit', {
                        title: 'Edit employee',
                        id: rows[0].id,
                        name: rows[0].name,
                        email: rows[0].email,
                        salary: rows[0].salary
                    })
                }
            })
        })
    }

    editEmployee(req, res, next) {
        const validateRequest = employeeValidate.editEmployee(req, res, next)
        if (validateRequest) {
            const employee = trimBody(req)
            req.getConnection(function (error, conn) {
                conn.query('UPDATE employee SET ? WHERE id = ' + req.params.id, employee, function (err, result) {
                    //if(err) throw err
                    if (err) {
                        req.flash('error', err)

                        res.render('employee/edit', {
                            title: 'Edit employee',
                            id: req.params.id,
                            name: req.body.name,
                            email: req.body.email,
                            salary: req.body.salary
                        })
                    } else {
                        req.flash('success', 'Data updated successfully!')

                        res.render('employee/edit', {
                            title: 'Edit employee',
                            id: req.params.id,
                            name: req.body.name,
                            email: req.body.email,
                            salary: req.body.salary
                        })
                    }
                })
            })

        } else {
            return validateRequest
        }
    }

    deleteEmployee(req, res, next) {
        var employee = {
            id: req.params.id
        }

        req.getConnection(function (error, conn) {
            conn.query('DELETE FROM employee WHERE id = ' + req.params.id, employee, function (err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    // redirect to employee list page
                    res.redirect('/employee')
                } else {
                    req.flash('success', 'employee deleted successfully! id = ' + req.params.id)
                    // redirect to employee list page
                    res.redirect('/employee')
                }
            })
        })
    }

    showSearchEmployeeForm(req, res, next) {
        res.render('employee/search', {
            title: 'Search employee by salary',
            symbol: '',
            salary: ''
        })
    }

    searchEmployeeBySalary(req, res, next) {
       const validateRequest = employeeValidate.searchEmployee(req, res, next)
       if(validateRequest){
           return validateRequest
       }else{ 
        req.getConnection(function (error, conn) {
            conn.query('SELECT * FROM employee WHERE salary' + req.body.symbol + req.body.salary, function (err, rows, fields) {
                if (err) throw err
                // if employee not found
                if (rows.length <= 0) {
                    req.flash('error', 'employee not found with salary' + req.body.symbol + req.body.salary)
                    res.redirect('/employee')
                } else { // if employee found
                    res.render('employee/list', {
                        title: 'Employee List with the salary is' +'  '+  req.body.symbol+'  ' + req.body.salary,
                        data: rows
                    })
                }
            })
        })}
    }
}

module.exports = Employee
