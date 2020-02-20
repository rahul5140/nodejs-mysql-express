class EmployeeValidator {

    addNewEmployeeValidator(req, res, next) {
        req.assert('name', 'Name is required').notEmpty() //Validate name
        req.assert('email', 'A valid email is required').isEmail() //Validate email
        req.assert('salary', 'salary is required').notEmpty() //Validate salary

        var errors = req.validationErrors()

        if (!errors) { //No errors were found.  Passed Validation!
            return null
        } else { //Display errors to employee
            var error_msg = ''
            errors.forEach(function (error) {
                error_msg += error.msg + '<br>'
            })
            req.flash('error', error_msg)

            res.render('employee/add', {
                title: 'Add New employee',
                name: req.body.name,
                email: req.body.email,
                salary: req.body.salary
            })
        }
    }

    editEmployee(req, res, next) {
        req.assert('name', 'Name is required').notEmpty() //Validate name
        req.assert('email', 'A valid email is required').isEmail() //Validate email
        req.assert('salary', 'salary is required').notEmpty() //Validate salary

        var errors = req.validationErrors()
        if (!errors) { //No errors were found.  Passed Validation!
            return null
        } else { //Display errors to employee
            var error_msg = ''
            errors.forEach(function (error) {
                error_msg += error.msg + '<br>'
            })
            req.flash('error', error_msg)

            res.render('employee/edit', {
                title: 'Edit employee',
                id: req.params.id,
                name: req.body.name,
                email: req.body.email,
                salary: req.body.salary
            })
        }
    }

    searchEmployee(req, res, next) {
        req.assert('symbol', 'Symbol is required').notEmpty() //Validate symbol
        req.assert('salary', 'Salary is required').notEmpty()
        var errors = req.validationErrors()
        if (!errors) { //No errors were found.  Passed Validation!
            return null
        } else { //Display errors to employee
            var error_msg = ''
            errors.forEach(function (error) {
                error_msg += error.msg + '<br>'
            })
            req.flash('error', error_msg)

            res.render('employee/search', {
                title: 'search employee',
                symbol: req.body.symbol,
                salary: req.body.salary
            })
        }
    }
}

module.exports = EmployeeValidator
