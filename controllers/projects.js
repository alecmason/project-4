const Project = require('../models/project')

// const S3 = require('aws-sdk/clients/s3');
// const { v4: uuidv4 } = require('uuid');

// const s3 = new S3()

// const BUCKET_NAME = process.env.BUCKET

module.exports = {
    create,
    index,
    detail,
    delete: deleteProject
}

async function create(req, res) {
    console.log(req.body, 'this is create method', req.user)
    try {
        const project = await Project.create({
            projectName: req.body.projectName,
            description: req.body.description,
            projectUrl: req.body.projectUrl,
            user: req.user,
        });

        console.log(project)
        res.status(201).json({ project: project })



    } catch (err) {
        console.log(err)
        res.json({ data: err })
    }
}

async function index(req, res) {
    console.log('hitting the index')
    try {
        const projects = await Project.find({}).populate('user').exec()
        if (!projects) return console.log('no projects')
        res.status(200).json({ projects })
    } catch (err) {
        console.log(err)
    }
}

// show full project description
async function detail(req, res) {
    try {
        const project = await Project.findOne({ _id: req.params.id }).populate('user').exec()
        res.status(200).json({ project })
    } catch (err) {
        console.log(err)
        res.status(400).json({ err })
    }
}


// delete one project by user
async function deleteProject(req, res) {
    console.log(req.params, '<- req.parrams deleteproject controller')
    try {
        const project = await Project.findByIdAndDelete(req.params.id)
        if (!project) return console.log('did not find project')

        console.log(project, '<- project in delete')
        // await project.save()
        res.status(200).json({ data: 'project removed' })
    } catch (err) {
        console.log(err)
        res.status(400).json({ err })
    }
}