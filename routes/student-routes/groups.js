const router = require('express').Router();
let Group = require('../../models/student-models/group.model');

router.route('/').get((req, res) => {
  Group.find()
    .then(groups => res.json(groups))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const groupname = req.body.groupname;
  const groupleader = req.body.groupleader;
  const supervisor = req.body.supervisor;
  const cosupervisor = req.body.supervisor;

  const newgroup = new Group({
    groupname,
    groupleader,
    supervisor,
    cosupervisor,
  });

  newgroup.save()
  .then(() => res.json('Group added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Group.findById(req.params.id)
    .then(group => res.json(group))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Group.findByIdAndDelete(req.params.id)
    .then(() => res.json('Group deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Group.findById(req.params.id)
    .then(group => {
      group.groupname = req.body.groupname;
      group.groupleader = req.body.groupleader;
      group.supervisor = req.body.supervisor;
      group.cosupervisor = req.body.cosupervisor;

      group.save()
        .then(() => res.json('Group updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;