const path = require('path')
const express = require('express');
const hbs = require('hbs')
const employees = require("./controllers/employee.controller.js");
const projects = require("./controllers/project.controller.js");


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Construction Co.',
        name: "Damar Sierra"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: "Damar Sierra",
        title: "About"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "This is some helpful text.",
        title: 'Help',
        name: "Damar Sierra"
    })
})


app.get('/employees', employees.findAll)

app.get('/employees/:empId', employees.findOne)

app.get('/projects', projects.findAll)

app.get('/projects/:proId', projects.findOne)


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMessage: 'Help article not found!',
        name: "Damar Sierra"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMessage: 'Page not found!',
        name: "Damar Sierra"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})