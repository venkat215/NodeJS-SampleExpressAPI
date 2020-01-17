var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db){

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id
        const details = {'_id' : new ObjectID(id)};
        db.collection('notes').findOne(details, (err, item) => {
            if(err){
                res.send({'error' : err})
            } else {
                res.send(item)
            } 
        })
    
    })

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id
        const details = {'_id' : new ObjectID(id)};

        db.collection('notes').remove(details, (err, item) => {
            if(err){
                res.send({'error' : err})
            } else {
                res.send(`Item ${id} has been removed`)
            } 
        })
    
    })

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id
        const note = { 'text' : req.body.body, 'title' : req.body.title};
        const details = {'_id' : new ObjectID(id)};

        db.collection('notes').update(details, note, (err, item) => {
            if(err){
                res.send({'error' : err})
            } else {
                res.send({'success_msg' : `Item ${id} has been updated`, 'updated_note' : item})
            } 
        })
    
    })

    app.post('/notes', (req, res) => {
        const note = { 'text' : req.body.body, 'title' : req.body.title};

        db.collection('notes').insert(note, (err, results) => {
            if(err){
                res.send({'error' : err})
            } else {
                res.send(results.ops[0])
            }
        })
        
    })

}

