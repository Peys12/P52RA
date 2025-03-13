/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_287511740")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "date3008614483",
    "max": "",
    "min": "",
    "name": "pesan",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3997586853",
    "max": 0,
    "min": 0,
    "name": "catatan",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_287511740")

  // remove field
  collection.fields.removeById("date3008614483")

  // remove field
  collection.fields.removeById("text3997586853")

  return app.save(collection)
})
