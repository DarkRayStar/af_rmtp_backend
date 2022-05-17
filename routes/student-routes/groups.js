const router = require('express').Router();
let Group = require('../../models/student-models/group.model');
// let nonGroupMember = require('../../models/userManagement-models/studentRegistration.model');

router.route('/').get((req, res) => {
  Group.find()
    .then(groups => res.json(groups))
    .catch(err => res.status(400).json('Error: ' + err));

  // nonGroupMember.find()
  //     .then(nonGroupMembers => res.json(nonGroupMembers))
  //     .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const groupname = req.body.groupname;
  const groupleader = req.body.groupleader;
  const member02 = req.body.member02;
  const member03 = req.body.member03;
  const member04 = req.body.member04;
  const supervisor = req.body.supervisor;
  const cosupervisor = req.body.supervisor;
  const researchTopic = req.body.researchTopic;
  const status = req.body.status;

  // const filter1 = { stdID: member02 };
  // const filter2 = { stdID: member03 };
  // const filter3 = { stdID: member04 };
  // const update = { studentGrpID: groupname};


  // //testing to find one by member name
  // nonGroupMember.findOneAndUpdate(filter1, update);
  // nonGroupMember.findOneAndUpdate(filter2, update);
  // nonGroupMember.findOneAndUpdate(filter3, update);


  const newgroup = new Group({
    groupname,
    groupleader,
    member02,
    member03,
    member04,
    supervisor,
    cosupervisor,
    researchTopic,
    status
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

//Did not used in front end
router.route('/update/:id').post((req, res) => {
  Group.findById(req.params.id)
    .then(group => {
      group.groupname = req.body.groupname;
      group.groupleader = req.body.groupleader;
      group.member02 = req.body.member02;
      group.member03 = req.body.member03;
      group.member04 = req.body.member04;
      group.supervisor = req.body.supervisor;
      group.cosupervisor = req.body.cosupervisor;
      group.researchTopic = req.body.researchTopic;
      group.status = req.body.status;

      group.save()
        .then(() => res.json('Group updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/update/member/:id').post((req, res) => {
//   Group.findById(req.params.id)
//     .then(group => {
//       group.groupname = req.body.groupname;
//       group.groupleader = req.body.groupleader;
//       group.supervisor = req.body.supervisor;
//       group.cosupervisor = req.body.cosupervisor;

//       group.save()
//         .then(() => res.json('Group updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;