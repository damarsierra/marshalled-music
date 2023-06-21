const Project = require("../models/project.model.js");
// Retrieve all Projects from the database.
exports.findAll = (req, res) => {
  Project.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving projects."
          });
        else {
          //res.send(data);
          res.render('projects', { 
            data,
            title: 'Projects',
            name: "Damar Sierra"
           })
        }
      });
};
// Find a single Project with a customerId
exports.findOne = (req, res) => {
  Project.findById(req.params.proId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Project with id ${req.params.proId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Project with id " + req.params.proId
          });
        }
      } else {
        //res.send(data);
        res.render('project', { 
          title: data.ProjectName,
          name: "Damar Sierra",
          data
         })
      }
    });
};