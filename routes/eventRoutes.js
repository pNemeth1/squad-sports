const mongoose = require('mongoose');
const Event = mongoose.model('event');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


module.exports = app => {

    // Process Add Event
    app.post('/api/create_event', jsonParser, (req, res) => {
        
        const newEvent = {
            city: req.body.city,
            sports: req.body.sports,
            street: req.body.street,  
            title: req.body.title,
            desc: req.body.desc,
            user: req.user._id,
            image: req.user.image,
            squadUserId: req.user.squadId,
        }
    
        // Create Story
        new Event(newEvent)
        .save()
        .then((event) => {
            console.log(req.body);
            Event.find({city: req.body.city, sports: req.body.sports})
            .sort({date:'desc'})
            // .populate('user')
            .then((results) => {
                res.send(results);
            });
            
        })
        .catch((e) => {
            console.log(e);
        });
    });

    app.post('/api/get_stories', jsonParser, (req, res) => {
        
        Event.find({city: req.body.city, sports: req.body.sports})
        .sort({date:'desc'})
        .then((results) => {
            res.send(results);
        })
        .catch((e) => {
            console.log(e)
        })
    });

    app.get('/api/get_userstories', (req, res) => {
        Event.find({squadUserId: req.user.squadId})
        .then((result) => {
            res.send(result);
        })
        .catch((e) => {
            console.log(e);
        })
    });
}