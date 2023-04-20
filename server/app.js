const express = require('express');
const cors = require('cors');
const questions = require('./questions')
const logger = require("./logger");

const app = express();

app.use(cors());
app.use(express.json())
app.use(logger);
app.get('/', (req, res) => {
    res.send(`Welcome to the quiz API! There are ${questions.length} available.`);
})
app.get('/questions', (req, res) => {
    res.send(questions);


})
app.post("/", (req, res) => {
    const question = req.body;
    quotes.push(question)
    res.status(201).send(question);
})
module.exports = app
