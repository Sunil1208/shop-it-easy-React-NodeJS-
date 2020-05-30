var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "x7n6nqp7k3q35s9f",
  publicKey: "xh8hgfrryjygxqjm",
  privateKey: "b1c9dd160c43581eb655b88292b2b661"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if(err) {
            res.status(500).send(err)
        } else {
            res.send(response)
        }
      });
}

exports.processPayment = (req, res) => {
    
    let nonceFromTheClient = req.body.paymentMethodNonce

    let amountFromTheClient = req.body.amount
    
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        //deviceData: deviceDataFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err) {
              res.status(500).json(err)
          } else {
              res.json(result)
          }
      });
}