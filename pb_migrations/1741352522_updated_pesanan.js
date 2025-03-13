/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_287511740")

  // add field
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
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_287511740")

  // remove field
  collection.fields.removeById("relation2638327303")

  return app.save(collection)
})
