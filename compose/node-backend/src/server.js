const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { storeRouter }  = require("./routes/store");
const { healthRouter } = require("./routes/health");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Hello! This is a hot deploy"
    })
})


app.use("/health", healthRouter);
app.use("/store", storeRouter);


console.log('Connecting to database...')
mongoose.connect(`mongodb://${process.env.MONGO_DB}/${process.env.MONGODB_NAME}`, {
    auth: {
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD
    },
    connectTimeoutMS: 500
})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Listening on port 3000')
        });
        console.log('Connected to DB!!')
    })
    .catch(err => {
        console.error('Something is wrong!!')
        console.error(err)
    });



