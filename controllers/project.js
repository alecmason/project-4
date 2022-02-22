const Project = require('../models/project')

module.exports = {
    create,
    index
}

function create() {
    console.log(req.body, '<-- req. body in controllers/project.create ')
}

function index() {
    console.log('controllers/project.index')
}