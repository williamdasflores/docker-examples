const express = require('express');
const { NotesModel } = require('./models');
const { Mongoose, default: mongoose } = require('mongoose');

const notesRouter = express.Router();

/*
POST api/notes
GET api/notes
GET api/notes/:id
PUT /api/notes/:id
DELETE /api/notes/:id
GET /health
*/

const errorHandling = (error, req, res) => {
    console.error("Error: ", error);
    res.status(500).json({
        error: 'Internal Server Error'
    });
}

notesRouter.post('/', async (req, res) => {
    const { title, content, notebookId } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            error: 'Fields title and content are required'
        })
    }

    try {
       /*  const existingNote = NotesModel.find( { title } );
        if (existingNote) {
            throw new Error('Note already exists!');
        }
 */
        const note = new NotesModel({ title, content, notebookId });
        await note.save();

        return res.status(201).json({
            message: 'Note created'
        })

    } catch(error) {
        return errorHandling(error, req, res);
    }
});

notesRouter.get('/', async (req, res) => {
    try {
        const notes = await NotesModel.find();
        const result = notes.map( ({ _id, title, content, notebookId }) =>({
            id: _id,
            title,
            content,
            notebookId
        }))

        return res.json({ data: result });

    } catch (error) {
        return errorHandling(error, req, res);
    }

});

notesRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                error: 'Note not found'
            });
        }

        const note = await NotesModel.findOne({ _id: id} );
        
        if (!note) {
            return res.status(404).json({
                 error: 'Note not found'
            });
        }

        return res.json({ 
            id: note._id,
            title: note.title,
            content: note.content,
            notebookId: note.notebookId
        });
    } catch(error) {
        return errorHandling(error, req, res);
    }
});

notesRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, notebookId } = req.body;

    if (!id) {
        return res.status(400).json({
            error: 'Id is required'
        }) 
    }

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                error: 'Note not found'
            });
        }

        const note = await NotesModel.findOne( { _id: id }) ;
        if (!note) {
             return res.status(404).json({
                error: 'Note not found'
            });
        }

        const noteUpdated = await NotesModel.findOneAndUpdate( { _id: id },
            { title, content, notebookId },
            { new: true }
        );

        return res.status(200).json({
            title: noteUpdated.title,
            content: noteUpdated.content,
            notebookId: noteUpdated.notebookId
        });
    } catch(error) {
        return errorHandling;
    }
});

notesRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            error: 'Id is required'
        })
    }

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                error: 'Note not found'
            });
        }

        const note = await NotesModel.findOneAndDelete( { _id: id} );
        if (!note) {
            return res.status(404).json({
                error: 'Note not found'
            });
        }

        return res.status(204).send();
    } catch(error) {
        return errorHandling;
    }

});

module.exports = {
    notesRouter
}

