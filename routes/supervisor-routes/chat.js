const router = require('express').Router();
let Chat = require('../../models/supervisor-models/chat.model')

router.route('/').get((req, res) => {
    Chat.find()
        .then(chats => res.json(chats))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const studentName = req.body.studentName;
    const supervisorName = req.body.supervisorName;
    const studentMsg = req.body.studentMsg;
    const supervisorMsg = req.body.supervisorMsg;

    const newChat = new Chat({
        studentName,
        supervisorName,
        studentMsg,
        supervisorMsg,
    });

    newChat.save()
        .then(() => res.json('Chat added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add/:id').post((req, res) => {
    const studentName = req.body.studentName;
    const supervisorName = req.body.supervisorName;
    const studentMsg = req.body.studentMsg;
    const supervisorMsg = req.body.supervisorMsg;
    Chat.findById(req.params.id)
        .then(chats => {
            chats.studentName = req.body.studentName;
            chats.supervisorName = req.body.supervisorName;
            chats.studentMsg = req.body.studentMsg;
            chats.supervisorMsg = req.body.supervisorMsg;

            const newChat = new Chat({
                studentName,
                supervisorName,
                studentMsg,
                supervisorMsg,
            });

            newChat.save()
                .then(() => res.json('Message added!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Chat.findById(req.params.id)
        .then(chats => res.json(chats))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Chat.findByIdAndDelete(req.params.id)
        .then(() => res.json('Chat deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Chat.findById(req.params.id)
        .then(chats => {
            chats.studentName = req.body.studentName;
            chats.supervisorName = req.body.supervisorName;
            chats.studentMsg = req.body.studentMsg;
            chats.supervisorMsg = req.body.supervisorMsg;

            chats.save()
                .then(() => res.json('Chat updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;