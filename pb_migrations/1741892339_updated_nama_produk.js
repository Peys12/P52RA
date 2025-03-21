/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4018278596")

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_287511740",
    "hidden": false,
    "id": "relation2154851158",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "pesanan",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4018278596")

  // remove field
  collection.fields.removeById("relation2154851158")

  return app.save(collection)
})
