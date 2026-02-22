const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { notesRouter } = require('./routes');


const app = express();
app.use(bodyParser.json());

const port = process.env.PORT

mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log('Connected to MongoDB! Starting Server.')
    app.listen(port, () => {
        console.log(`Notes server is listening on port ${port}`);
    });
})
.catch((err) => {
    console.error('Something went wrong')
    console.error(err);
});

app.use("/api/notes", notesRouter);

app.get('/api/notes/health', (req, res) => {
    return res.status(200).send('This is up and runnig!');
})



