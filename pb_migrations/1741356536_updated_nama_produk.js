/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4018278596")

  // update collection data
  unmarshal({
    "listRule": "",
    "viewRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4018278596")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id != \"\"  // Hanya user yang login yang bisa melihat data\n",
    "viewRule": null
  }, collection)

  return app.save(collection)
})
