/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_287511740")

  // update field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "number1676813404",
    "max": null,
    "min": null,
    "name": "whatsapp",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_287511740")

  // update field
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

  return app.save(collection)
})
