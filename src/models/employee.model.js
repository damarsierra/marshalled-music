const sql = require("./db.js");

const Employee = function(employee) {
    this.email = employee.email;
    this.name = employee.name;
    this.active = employee.active;
};

Employee.getAll = result => {
    sql.query("SELECT * FROM ConstructCo.select_employee", (err, res) => {
        if(err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        console.log("employees: ", res);
        result(null, res);
    });
};

Employee.findById = (empId, result) => {
    sql.query(`SELECT * FROM ConstructCo.select_employee WHERE empId = ${empId}`, (err, res) => {
        if(err) {
            console.log("error:", err);
            result(null, err);
            return;
        }
        if(res.length) {
            console.log("found project: ", res[0])
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

module.exports = Employee;