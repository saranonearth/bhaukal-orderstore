const cors = require('cors')
const bodyParser = require('body-parser');



module.exports = function (app) {
    app.set('view engine', 'ejs');
    app.set('views', 'views');
    app.use(cors());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());

}