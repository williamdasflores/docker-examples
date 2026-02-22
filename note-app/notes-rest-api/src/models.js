const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new mongoose.Schema(
    {
        title: { 
            type: String,
            required: true 
        },
        content: {
            type: String,
            required: true
        },
        notebookId: {
            type: Schema.Types.ObjectId,
            required: false,
            default: null
        }
    },
    { timestamps: true }
);

const NotesModel = mongoose.model("NotesModel", notesSchema);

module.exports = {
    NotesModel
}