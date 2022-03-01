const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    projectName: String,
    description: String,
    projectUrl: String,

})

module.exports = mongoose.model('Project', projectSchema);