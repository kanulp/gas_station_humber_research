const functions = require('firebase-functions');
const stripe = require('stripe')('sk_test_51IZNXDEpsLVtl1KC3UHkBvlRNc1bhFK7PHAs8H7b24VVCqaO3CIUbHM93flnbuE5rg2uVf6wRWTYwppDTLOq20A100FgCBhYyo');

exports.payWithStripe = functions.https.onRequest((request, response) => {
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    console.log('data from client : ' + request.body.amount + ' ' + request.body.currency);

    // eslint-disable-next-line promise/catch-or-return
    // stripe.charges.create({
    //         amount: request.body.amount,
    //         currency: request.body.currency,
    //         source: request.body.token,
    //     }).then((charge) => {
    //         // asynchronously called
    //         console.log('data from client : ' + request.body.amount + ' ' + request.body.currency + ' ' + request.body.token);
    //         response.send(charge);
    //         consol.log('Response from firebase cloud function : ' + charge.body);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    stripe.paymentIntents.create({
            amount: request.body.amount,
            currency: 'cad',
            payment_method_types: ['card'],
        }).then((charge) => {
            // asynchronously called
            console.log('data from client : ' + request.body.amount + ' ' + request.body.currency);
            response.send(charge);
            consol.log('Response from firebase cloud function : ' + charge.body);
        })
        .catch(err => {
            console.log(err);
        });

});