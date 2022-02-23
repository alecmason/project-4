const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({

    username: String,
    photoUrl: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    textContent: String
})

const saveSchema = mongoose.Schema({

    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const projectSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    projectName: String,
    description: String,
    photoUrl: String,
    projectUrl: String,
    saves: [saveSchema],
    comments: [commentSchema]
})


module.exports = mongoose.model('Project', projectSchema);