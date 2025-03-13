/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_287511740")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number1953286692",
    "max": null,
    "min": null,
    "name": "total_pesanan",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number2877705063",
    "max": null,
    "min": null,
    "name": "harga",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4018278596",
    "hidden": false,
    "id": "relation2638327303",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "produk",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_287511740")

  // remove field
  collection.fields.removeById("number1953286692")

  // remove field
  collection.fields.removeById("number2877705063")

  // update field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4018278596",
    "hidden": false,
    "id": "relation2638327303",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "produk",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
