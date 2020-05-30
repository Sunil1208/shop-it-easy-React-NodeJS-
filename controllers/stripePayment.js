const stripe = require('stripe')("sk_test_knaSJm4KbVFnfocPD2efbLyo00XzJcEJxh")
const uuid = require('uuid/v4')


exports.makePayment = (req, res) => {
    const {products,token} = req.body
    console.log(products)

    let amount =0
        products.map((product, index) => {
            amount = amount+ product.price
        });

        let shippingCharges = parseFloat(0.03*amount);
        let tax = parseFloat(0.05*amount);
        let total = shippingCharges+tax+amount

        const idempotencyKey = uuid()

        return stripe.customers.create({
            email: token.email,
            source: token.id,

        }).then( customer => {
            stripe.charges.create({
                amount: total *100,
                currency: 'usd',
                customer: customer.id,
                receipt_email: token.email,
                description: `Purchased the product`,
                // shipping: {
                //     name: token.card.name,
                //     address: {
                //         line1: token.card.address_line1,
                //         line2: token.card.address_line2,
                //         city: token.card.address_city,
                //         country: token.card.address_country,
                //         postal_code: token.card.address_zip
                //     }
                // }
            },{idempotencyKey})
            .then(result => {
                console.log(result)
               return res.status(200).json(result)})
            .catch( err => console.log(err))
        })
        .catch(console.log('Failed'));
}