const express = require('express');
const middlewares = require('./middleware/middleware')
const routes = require('./routes/routes');
const app = express();
const PORT = process.env.PORT || 4000;
const path = require('path')



middlewares(app);
routes(app);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log("Server running on port" + PORT)
})