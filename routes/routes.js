const checksum_lib = require('../utils/checksum');
const shortid = require('shortid')
const Product = require('../model/Product');
const Order = require('../model/Order');
module.exports = function (app) {
  //home page
  app.get('/', async (req, res) => {
    res.render('index');
  });

  //limted product page
  app.get('/exclusiveproduct', (req, res) => {
    res.render('limitedProduct');
  });

  //order placed 
  app.get('/orderplaced', (req, res) => {
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
  })

  app.get('/product', async (res, req) => {
    try {
      const product = await Product.find({})
      res.status(200).json(product)
    } catch (error) {
      console.log(error)
    }
  })
  //payment gateway

  //POST checkout
  app.post('/order', async (req, res) => {
    console.log(req.body)
    const {
      email,
      phone,
      name,
      amount,
      hostel,
      roomNo,
      size
    } = req.body

    try {
      const custID = name + shortid.generate();
      const orderID = shortid.generate();
      const newOrder = await new Order({
        name,
        phone,
        hostel,
        roomNo,
        email,
        size,
        orderId: orderID,
        custId: custID,
        productName: 'Engineering Things | Black Solid T-Shirt',
        product: '5d9039571c9d440000bdac44',
      })
      await newOrder.save();

      var params = {};
      params['MID'] = process.env.MID;
      params['WEBSITE'] = 'WEBSTAGING';
      params['CHANNEL_ID'] = 'WEB';
      params['INDUSTRY_TYPE_ID'] = 'Retail';
      params['ORDER_ID'] = orderID + new Date().getTime();
      params['CUST_ID'] = custID;
      params['TXN_AMOUNT'] = amount;
      params['CALLBACK_URL'] = process.env.CALLBACKURL;
      params['EMAIL'] = email;
      params['MOBILE_NO'] = phone;

      checksum_lib.genchecksum(params, process.env.PKEY, async function (err, checksum) {
        if (err) console.log('paytm', err)


        var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction";

        // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production

        var form_fields = "";
        for (var x in params) {
          form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
        }

        newOrder.checkhash = checksum;
        await newOrder.save();
        form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";

        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
        res.end();
      });
    } catch (error) {
      console.log(error)
    }
  })



  // Callback 

  app.post('/callback', async (req, res) => {
    console.log('callback', req.body);
    const orderid = req.body.ORDERID.substring(0, 9);
    const {
      ORDERID,
      TXNID,
      TXNAMOUNT,
      STATUS,
      RESPMSG,
      PAYMENTMODE,
      TXNDATE,
      GATEWAYNAME,
      BANKTXNID,
      BANKNAME
    } = req.body;


    const check = checksum_lib.verifychecksum(req.body, process.env.PKEY, req.body.CHECKSUMHASH);
    if (check) {
      try {

        const order = await Order.findOne({
          orderId: orderid
        }).exec()

        order.orderId = ORDERID;
        order.trasactionId = TXNID;
        order.amount = TXNAMOUNT;
        order.status = STATUS;
        order.resMsg = RESPMSG;
        order.paymentMode = PAYMENTMODE;
        order.transactionDate = TXNDATE;
        order.gatewayCode = GATEWAYNAME;
        order.bankTXNID = BANKTXNID;
        order.bankName = BANKNAME;

        await order.save()
        console.log('order', order)

        return res.render('orderPlaced', order)
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('error')
    }
  })
};