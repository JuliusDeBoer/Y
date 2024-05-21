/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("eryg2a1gb20x7l3");

    collection.viewRule = "";

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("eryg2a1gb20x7l3");

    collection.viewRule = null;

    return dao.saveCollection(collection);
  },
);
