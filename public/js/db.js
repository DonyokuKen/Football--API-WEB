var dbPromised = idb.open("football", 1, function(upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("articles", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("name", "name", {
    unique: false
  });
});

function saveForLater(teams) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("articles", "readwrite");
      var store = tx.objectStore("articles");
      console.log(teams);   
    
      store.put(teams);
      return tx.complete;
    })
    .then(function() {
      console.log("Artikel berhasil di simpan.");
    });
}

function getAll() {
  return new Promise(function(resolve, _reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("articles", "readonly");
        var store = tx.objectStore("articles");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}

function delTeams(teams) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("articles", "readwrite");
      var store = tx.objectStore("articles");
      console.log(teams);   
    
      store.delete(teams.id);
      return tx.complete;
    })
    .then(function() {
      console.log("Artikel berhasil di hapus.");
    });
}
