const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const fetchTable = require("./functions/fetchTable");
const fetchPage = require("./functions/fetchPage");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/:id', async (req, res) => {
    await fetchPage()
    const html = await fetchTable(req.params.id)
    res.send(html);
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});