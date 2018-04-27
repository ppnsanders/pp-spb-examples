'use strict'

const faker = require('faker')

module.exports = function CartModel(numberOfItems) {
        let items = []
        for(let count=0; count < numberOfItems; count++) {
            let tmpItem = {}
                tmpItem.name = faker.commerce.product()
                let productSku = faker.random.uuid()
                tmpItem.sku = 'SKU-' + productSku.substring(0, 8) //max of 12 characters for BT
                tmpItem.price = Number.parseFloat(faker.finance.amount(1, 99)).toFixed(2)
                tmpItem.currency = 'USD'
                tmpItem.quantity = Math.floor((Math.random() * 5) + 1)
                tmpItem.category = 'PHYSICAL'
                tmpItem.description = faker.lorem.words(5)
                //image URL's from lorempixel.com
                tmpItem.url = faker.image.imageUrl(200, 200, 'technics', true)
                items.push(tmpItem)
          }
          return items
}

/*
EXAMPLE OUTPUT OF items array:
"items": [
          {
            "name": "DSLRCameraLensCap",
            "sku": "sku03",
            "price": "0.54",
            "currency": "USD",
            "quantity": "1",
            "category": "PHYSICAL"
          },
          {
            "name": "DSLRCameraLensCleaner",
            "sku": "sku04",
            "price": "0.55",
            "currency": "USD",
            "quantity": "1",
            "category": "PHYSICAL"
          }
        ]
*/