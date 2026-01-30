const express = require("express");
const { KeyValue } = require('../models/keyValue')

const storeRouter = express.Router();


storeRouter.post('/', async (req, res) => {
    const { key, value } = req.body;

    if (!key || !value) {
        return res.status(400).json({
            error: 'Key and Value are required!'
        });
    }

    try {
        const existingKey = await KeyValue.findOne({ key });
        if (existingKey) {
            return res.status(400).json({
                error: "Key already exists"
            })
        }

        const keyValue = new KeyValue({ key, value });
        await keyValue.save();

        return res.status(201).json({
            message: "Key-Value pair stored successfully"
        });

    } catch(err) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
    return res.status(201).send("Creating record");

});

storeRouter.get('/:key', async (req, res) => {
    const { key } = req.params;
    
    try {
        const keyValue = await KeyValue.findOne({ key });
        if (!keyValue) {
            return res.status(404).json({
                error: "Key not found!!"
            })
        }
        return res.status(200).json({
            key: keyValue.key,
            value: keyValue.value
        });

    } catch(err) {
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
});

storeRouter.get("/", async (req, res) => {
    try {
        const keyValue = await KeyValue.find();
        return res.status(200).json(keyValue);

    } catch(err) {
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
});

storeRouter.put('/:key', async (req, res) => {
    const { key } = req.params;
    const { value } = req.body;

    if (!key || !value) {
        return res.status(400).json({
            error: "Key and Value are required."
        })
    }
    
    try {
        const keyValue = await KeyValue.findOneAndUpdate({ key }, { value }, { new: true });

        if (!keyValue) {
            return res.status(404).json({
                error: "Key-Value not found", key, value
            })
        }

        return res.status(200).json({
            key: keyValue.key,
            value: keyValue.value
        })
    } catch(err) {
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
});

storeRouter.delete('/:key', async (req, res) => {
    const { key } = req.params;

    if (!key) {
        return res.status(400).json({
            error: "Key is required."
        })
    }
    try {
        const keyValue = await KeyValue.findOneAndDelete({ key });
        if (!keyValue) {
            return res.status(404).json({
                error: "Key not found."
            })
        }

        return res.status(204).send();
    } catch(err) {
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
});

module.exports = {
    storeRouter,
};
