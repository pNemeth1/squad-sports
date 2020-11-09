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

    app.post('/api/get_events', jsonParser, (req, res) => {
        
        Event.find({city: req.body.city, sports: req.body.sports})
        .sort({date:'desc'})
        .then((results) => {
            res.send(results);
        })
        .catch((e) => {
            console.log(e)
        })
    });

    app.get('/api/get_userevents', (req, res) => {
        Event.find({squadUserId: req.user.squadId})
        .populate('user')
        .then((result) => {
            res.send(result);
        })
        .catch((e) => {
            console.log(e);
        })
    });

    app.post('/api/get_event', jsonParser, (req, res) => {
        Event.findOne({_id: req.body.id})
        .then((result) => {
            res.send(result);
        })
        .catch((e) => {
            console.log(e);
        });
    });

    app.post('/api/add_comment', jsonParser, (req, res) => { 
        let newComment;
        console.log(req.user.squadId)
        console.log(req.user.image)
        Event.findOne({_id: req.body.id})
        .populate('user')
        .then((event) => {
            console.log(event)
            newComment = {
                commentBody: req.body.comment,
                commentUserId: req.user.squadId,
                commentUserImage: req.user.image,
                commentUserFirstName: req.user.firstName
            };

            console.log(newComment)

            event.comments.push(newComment);
            event.save()
            .then((event) => {
                res.send(event);
            });

        })
        .catch((e) => {
            console.log(e);
        });
    });
}