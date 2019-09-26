const checksum_lib = require('../utils/checksum');
const shortid = require('shortid')

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

  //contact
  app.get('/contact', (req, res) => {
    res.render('contact');
  });

  //order checkout
  app.get('/checkout', (req, res) => {
    res.render('checkout');
  });


  //payment gateway

  //POST checkout
  app.post('/order', (req, res) => {
    console.log(req.body)
    const {
      email,
      phone,
      name,
      amount
    } = req.body
    const custID = name + shortid.generate();
    const orderID = shortid.generate();
    var params = {};
    params['MID'] = process.env.MID;
    params['WEBSITE'] = 'WEBSTAGING';
    params['CHANNEL_ID'] = 'WEB';
    params['INDUSTRY_TYPE_ID'] = 'Retail';
    params['ORDER_ID'] = orderID;
    params['CUST_ID'] = custID;
    params['TXN_AMOUNT'] = amount;
    params['CALLBACK_URL'] = process.env.CALLBACKURL;
    params['EMAIL'] = email;
    params['MOBILE_NO'] = phone;
    checksum_lib.genchecksum(params, process.env.PKEY, function (err, checksum) {

      var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction";

      // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production

      var form_fields = "";
      for (var x in params) {
        form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
      }
      form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";

      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
      res.end();
    });
  })



  // Callback 

  app.post('/callback', (req, res) => {
    console.log(req.body);

    res.render('index')
  })

};