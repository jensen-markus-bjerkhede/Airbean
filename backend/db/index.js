const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./db/menu.json')
const db = low(adapter)

db.defaults({
  "products": [
    {
      "id": 1,
      "title": "Bryggkaffe",
      "desc": "Bryggd på månadens bönor.",
      "price": 39
    },
    {
      "id": 2,
      "title": "Caffè Doppio",
      "desc": "Bryggd på månadens bönor.",
      "price": 49
    },
    {
      "id": 3,
      "title": "Cappuccino",
      "desc": "Bryggd på månadens bönor.",
      "price": 49
    },
    {
      "id": 4,
      "title": "Latte Macchiato",
      "desc": "Bryggd på månadens bönor.",
      "price": 49
    },
    {
      "id": 5,
      "title": "Kaffe Latte",
      "desc": "Bryggd på månadens bönor.",
      "price": 54
    },
    {
      "id": 6,
      "title": "Cortado",
      "desc": "Bryggd på månadens bönor.",
      "price": 39
    }
  ],
  "orders": [
  ],
  "users": [
  ]
    })
  .write()

module.exports = { db };