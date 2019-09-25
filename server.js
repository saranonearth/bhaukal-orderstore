const express = require('express');
const middlewares = require('./middleware/middleware')
const app = express();
const PORT = process.env.PORT || 4000;
middlewares();
app.get('/', (req, res) => {
    res.send('working bro')
})

app.listen(PORT, () => {
    console.log("Server running on port" + PORT)
})