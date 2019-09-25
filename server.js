const express = require('express');
const middlewares = require('./middleware/middleware')
const routes = require('./routes/routes');
const app = express();
const PORT = process.env.PORT || 4000;


middlewares(app);
routes(app);


app.listen(PORT, () => {
    console.log("Server running on port" + PORT)
})