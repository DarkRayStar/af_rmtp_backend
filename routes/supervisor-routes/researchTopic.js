const router = require('express').Router();
let ResearchTopic = require('../../models/supervisor-models/researchTopic.model')

router.route('/').get((req, res) => {
    ResearchTopic.find()
        .then(researchTopics => res.json(researchTopics))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const topic = req.body.topic;
    const groupName = req.body.groupname;
    const state = req.body.state;
    // const researchField = req.body.researchField;

    const newResearchTopic = new ResearchTopic({
        topic,
        groupName,
        state,
        // researchField
    });

    newResearchTopic.save()
        .then(() => res.json('Topic added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    ResearchTopic.findById(req.params.id)
        .then(researchTopics => res.json(researchTopics))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    ResearchTopic.findByIdAndDelete(req.params.id)
        .then(() => res.json('Topic deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    ResearchTopic.findById(req.params.id)
        .then(researchTopics => {
            researchTopics.topic = req.body.topic;
            researchTopics.groupName = req.body.groupName;
            researchTopics.state = req.body.state;
            researchTopics.csState = req.body.csState;
            // researchField.researchField = req.body.researchField;

            researchTopics.save()
                .then(() => res.json('Topic updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;