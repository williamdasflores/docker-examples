const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { notebooksRouter } = require('./routers');

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT

mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log('Connected to MongoDB! Starting Server.')
    app.listen(port, () => {
        console.log(`Notebooks server is listening on port ${port}`);
    });
})
.catch((err) => {
    console.error('Something went wrong')
    console.error(err);
});

app.use('/api', notebooksRouter)

app.get('/health', (req, res) => {
    return res.status(200).send('This is up and runnig!');
})



