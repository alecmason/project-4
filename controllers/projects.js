const Project = require('../models/project')

// const S3 = require('aws-sdk/clients/s3');
// const { v4: uuidv4 } = require('uuid');

// const s3 = new S3()

// const BUCKET_NAME = process.env.BUCKET

module.exports = {
    create,
    index,
    // show
}

async function create(req, res) {
    console.log(/* req.file, */ req.body, 'this is create method', req.user)
    try {
        // const filePath = `${uuidv4()}/${req.file.originalname}`
        // const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer };
        // s3.upload(params, async function (err, data) {

        const project = await Project.create({
            projectName: req.body.projectName,
            description: req.body.description,
            projectUrl: req.body.projectUrl,
            user: req.user,
            /* , photoUrl: data.Location */
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

// async function show(req, res) {
//     try {
//         const project = await Project.findById({}).populate('user').exec()
//         res.status(200).json({ projects })
//     } catch (err) {

//     }
// }
