/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_287511740")

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "number1676813404",
    "max": null,
    "min": null,
    "name": "nomer_hp",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1498331679",
    "max": 0,
    "min": 0,
    "name": "nama",
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
  collection.fields.removeById("number1676813404")

  // remove field
  collection.fields.removeById("text1498331679")

  return app.save(collection)
})
