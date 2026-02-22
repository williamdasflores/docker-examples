const express = require('express');
const { NotebooksModel } = require('./models');
const { default: mongoose } = require('mongoose');

const notebooksRouter = express.Router();

const validateId = (req, res, next) => {
     const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: "Notebook not found"
        })
    }
    next();
}

notebooksRouter.get('/notebooks', async (req, res) => {
    try {
        const notebooks = await NotebooksModel.find();
        const result = notebooks.map( ({ _id, name, description }) => ({
            id: _id,
            name,
            description,
        }));
        return res.json({ data: result });

    } catch(error) {
        console.error("Error", error);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
})

notebooksRouter.get('/notebooks/:id', validateId, async (req, res) => {
    try {
        const notebook = await NotebooksModel.findOne({ _id: req.params.id });
        
        if (!notebook) {
            return res.status(404).json({
                error: "Notebook not found"
            });
        }

        return res.json({
            id: notebook._id,
            name: notebook.name,
            description: notebook.description
        });
    } catch(error) {
        console.error("Error", error);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
});


notebooksRouter.post('/notebooks', async (req, res) => {
    const { name, description } = req.body;
    if (!name) {
        return res.status(400).json({
            error: 'Name is required.'
        })
    }

    try {
        const existingNotebook = await NotebooksModel.findOne({ name });
        if (existingNotebook) {
            return res.status(400).json({
                error: "Notebook already exists."
            })
        }

        const notebook = new NotebooksModel({ name, description });
        await notebook.save();
        return res.status(201).send("Created");
    } catch(error) {
        console.error("Error", error);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

notebooksRouter.put("/notebooks/:id", validateId, async (req, res) => {
    const { name, description } = req.body;
    try {
        const notebook = await NotebooksModel.findOneAndUpdate(
            { _id: req.params.id },
            { name, description },
            { new : true });

        if (!notebook) {
            return res.status(404).json({
                error: "Notebook not found"
            })
        }

        return res.status(200).json({
            id: notebook._id,
            name: notebook.name,
            description: notebook.description
        });

    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }

});

notebooksRouter.delete("/notebooks/:id", validateId, async (req, res) => {
    try {
        const notebook = await NotebooksModel.findOneAndDelete(req.params.id);
         if (!notebook) {
        res.status(404).json({
            error: "Notebook not found"
        });
    }

    } catch(error) {
        console.error("Error", error);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

module.exports = {
    notebooksRouter
}