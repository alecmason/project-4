const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({

    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    textContent: String
})

const saveSchema = mongoose.Schema({

    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const projectSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // photoUrl: String,
    description: String,
    saves: [saveSchema],
    comments: [commentSchema]
})


module.exports = mongoose.model('Project', projectSchema);