module.exports = function (app) {
  //home page
  app.get('/', (req, res) => {
    res.render('index');
  });

  //limted product page
  app.get('/exclusiveproduct', (req, res) => {
    res.render('limitedProduct');
  });

  //order placed 
  app.get('/orderplaced/:id', (req, res) => {
    res.render('orderPlaced');
  });

  //order Details
  app.get('/orderdetails/:id', (req, res) => {
    res.render('orderDetails');
  });

  //order Details
  app.get('/checkorder', (req, res) => {
    res.render('checkOrder');
  });


};