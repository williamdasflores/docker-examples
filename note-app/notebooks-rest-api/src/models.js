const mongoose = require('mongoose');

const notebooksSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: false
    },
    },
    { timestamps: true }
);

const NotebooksModel = mongoose.model("NotebooksModel", notebooksSchema);

module.exports = {
    NotebooksModel
}