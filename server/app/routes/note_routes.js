var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
  app.post('/note', (req, res) => {
    const note = {
      user_id: new ObjectID(req.body.user_id),
      title: req.body.title,
      body: req.body.body
    }
    db.collection('note').insertOne(note, (err, result) => {
      if (err) {
        console.log(`Error updating object: ${err}`);
        res.send({ 'error': 'An error has occurred', 'status': 400 });
      } else {
        res.json(result.ops[0]);
      }
    })
  })

  app.put('/note/:id', (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection('note').updateOne(
      details,
      {
        $set: {
          title: req.body.title,
          body: req.body.body
        }
      },
      (err, result) => {
        if (err) {
          console.log(`Error updating object: ${err}`);
          res.send({ 'error': 'An error has occurred', 'status': 400 });
        } else {
          console.log(`${result} document(s) updated`);
          res.send(id);
        }
      }
    )
  })
};