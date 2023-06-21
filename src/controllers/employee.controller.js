const Employee = require("../models/employee.model.js");
// Retrieve all Employees from the database.
exports.findAll = (req, res) => {
    Employee.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving employees."
          });
        else {
          //res.send(data);
          res.render('employees', { 
            data,
            title: 'Employees',
            name: "Damar Sierra"
           })
        }
      });
};
// Find a single Employee with a customerId
exports.findOne = (req, res) => {
  Employee.findById(req.params.empId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Employee with id ${req.params.empId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Employee with id " + req.params.empId
          });
        }
      } else {
        //res.send(data);
        res.render('employee', { 
          title: "Employee Information",
          name: "Damar Sierra",
          data
         })
      }
    });
};