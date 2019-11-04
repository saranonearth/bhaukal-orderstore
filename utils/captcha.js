const request = require("request");

module.exports = function(req) {
  const secretKey = process.env.CPSECKEY;
  const verificationURL =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    secretKey +
    "&response=" +
    req.body["g-recaptcha-response"] +
    "&remoteip=" +
    req.connection.remoteAddress;

  const res = request(verificationURL, async function(error, response, body) {
    if (body.success) {
      return true;
    } else {
      return false;
    }
  });
};
