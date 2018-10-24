'use strict'
const faker = require('faker')

module.exports = function CreatePaymentModel(items) {
        let payment = {}
            payment.intent = "sale"
            payment.note_to_payer = faker.lorem.sentence()
            //redirect_urls
            payment.redirect_urls = {}
            payment.redirect_urls.return_url = "http://localhost:8000/return"
            payment.redirect_urls.cancel_url = "http://localhost:8000/cancel"
            payment.payer = {}
            payment.payer.payment_method = "paypal"
            payment.transactions = []
            payment.transactions[0] = {}
            payment.transactions[0].description = faker.lorem.sentence()
            payment.transactions[0].custom = faker.random.uuid()
            payment.transactions[0].invoice_number = payment.transactions[0].custom
            payment.transactions[0].soft_descriptor = "Test App"
            //amount object
            payment.transactions[0].amount = {}
            payment.transactions[0].amount.currency = "USD"
            payment.transactions[0].amount.details = {}
            payment.transactions[0].amount.details.subtotal = items.total
                let tax = Number(items.total) * 0.07
            payment.transactions[0].amount.details.tax = Number.parseFloat(tax).toFixed(2)
            payment.transactions[0].amount.details.shipping = 10.00
            payment.transactions[0].amount.details.handling_fee = 0.50
            payment.transactions[0].amount.details.shipping_discount = -5.00
                let insurance = Number(items.total) * 0.1
            payment.transactions[0].amount.details.insurance = Number.parseFloat(insurance).toFixed(2)
                let total = Number(items.total) + Number(payment.transactions[0].amount.details.tax) + Number(payment.transactions[0].amount.details.shipping) + (payment.transactions[0].amount.details.handling_fee) + Number(payment.transactions[0].amount.details.shipping_discount) + Number(payment.transactions[0].amount.details.insurance)
            payment.transactions[0].amount.total = Number.parseFloat(total).toFixed(2)
            //payment_options
            payment.transactions[0].payment_options = {}
            payment.transactions[0].payment_options.allowed_payment_method = "INSTANT_FUNDING_SOURCE"
            //item_list
            payment.transactions[0].item_list = {}
            payment.transactions[0].item_list.items = items.items

          return payment
}
