var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
  app.get('/customer/:id', (req, res) => {
    const id = req.params.id;
    db.collection('customer').aggregate([
      {
        $match: {
          '_id': new ObjectID(id)
        }
      },
      {
        $lookup:
        {
          from: "note",
          localField: "_id",
          foreignField: "user_id",
          as: "notes"
        }
      }
    ], (err, notes) => {
      if (err) {
        console.log(`Error fetching objects: ${err}`);
        res.send({ 'error': 'An error has occurred', 'status': 400 });
      } else {
        notes.toArray().then(result => {
          res.send(result);
        })
      }
    })
  });

  app.get('/', (req, res) => {
    db.collection('customer').aggregate([
      {
        $lookup:
        {
          from: "note",
          localField: "_id",
          foreignField: "user_id",
          as: "notes"
        }
      }
    ], (err, notes) => {
      if (err) {
        console.log(`Error fetching objects: ${err}`);
        res.send({ 'error': 'An error has occurred', 'status': 400 });
      } else {
        notes.toArray().then(result => {
          res.send(result);
        })
      }
    })
  });

  app.put('/customer/:id', (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection('customer').updateOne(
      details,
      {
        $set: {
          status: req.body.status,
        }
      },
      (err, result) => {
        if (err) {
          console.log(`Error updating object: ${err}`);
          res.send({ 'error': 'An error has occurred', 'status': 400 });
        } else {
          // console.log(`${result} document(s) updated`);
          res.send(id);
        }
      }
    )
  })
};