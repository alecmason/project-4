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
    try {
        const projects = await Project.find({}).populate('user').exec()
        res.status(200).json({ projects })
    } catch (err) {

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
    try {
        const project = await Project.findOne({ _id: req.params.id })
        project.remove(req.params.id)
        console.log(project, '<- project in delete')
        await project.save()
        res.json({ data: 'project removed' })
    } catch (err) {
        res.status(400).json({ err })
    }
}

// async function deleteLike(req, res) {
//     try {

//         const post = await Post.findOne({ 'likes._id': req.params.id, 'likes.username': req.user.username });
//         post.likes.remove(req.params.id) // mutating a document
//         console.log(post, " <-= post in delete!")
//         // req.params.id is the like id 
//         await post.save() // after you mutate a document you must save
//         res.json({ data: 'like removed' })
//     } catch (err) {
//         res.status(400).json({ err })
//     }
// }