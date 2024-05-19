/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eryg2a1gb20x7l3")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mbxcrreu",
    "name": "content",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 8,
      "max": 281,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eryg2a1gb20x7l3")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mbxcrreu",
    "name": "content",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 8,
      "max": 256,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
