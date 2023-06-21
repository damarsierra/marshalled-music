const sql = require("./db.js");

const Project = function(project) {
    this.email = project.email;
    this.name = project.name;
    this.active = project.active;
};

Project.getAll = result => {
    sql.query("SELECT * FROM ConstructCo.select_project", (err, res) => {
        if(err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        console.log("projects: ", res);
        result(null, res);
    });
};

Project.findById = (proId, result) => {
    sql.query(`SELECT * FROM ConstructCo.select_project WHERE proId = ${proId}`, (err, res) => {
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

module.exports = Project;