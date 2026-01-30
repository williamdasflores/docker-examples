const express = require('express');
const healthRouter = express.Router();


healthRouter.get('/', (req, res) => {
    return res.status(200).send('Server up!');
})

module.exports = {
    healthRouter,
}
