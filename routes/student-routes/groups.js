const router = require('express').Router();
let Group = require('../../models/student-models/group.model');
let Topic = require('../../models/supervisor-models/researchTopic.model');
// let nonGroupMember = require('../../models/userManagement-models/studentRegistration.model');

//get All
router.route('/').get((req, res) => {
  Group.find()
    .then(groups => res.json(groups))
    .catch(err => res.status(400).json('Error: ' + err));

  // nonGroupMember.find()
  //     .then(nonGroupMembers => res.json(nonGroupMembers))
  //     .catch(err => res.status(400).json('Error: ' + err));
});

//insert
router.route('/add').post((req, res) => {
  const groupname = req.body.groupname;
  const groupleader = req.body.groupleader;
  const member02 = req.body.member02;
  const member03 = req.body.member03;
  const member04 = req.body.member04;
  const supervisor = req.body.supervisor;
  const cosupervisor = req.body.supervisor;
  const topic = req.body.topic;
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
    topic,
    status
  });

  newgroup.save()
    .then(() => res.json('Group added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//findById
router.route('/:id').get((req, res) => {
  Group.findById(req.params.id)
    .then(group => res.json(group))
    .catch(err => res.status(400).json('Error: ' + err));
});

//delete
router.route('/:id').delete((req, res) => {
  Group.findByIdAndDelete(req.params.id)
    .then(() => res.json('Group deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Did not used in front end
// router.route('/update/:id').post((req, res) => {
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

// update topic
router.route('/update/topic').post((req, res) => {

  const groupname = req.body.groupname;
  const topic = req.body.topic;

  const filter = { groupName: groupname};
  const update = { topic: topic };

  Topic.findOneAndUpdate(filter, {$set:{topic:topic }}, {new: true}, (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }

    console.log(doc);
  });
});

//add co-supervisor
router.route('/update/cosupervisor').post((req, res) => {

  const groupname = req.body.groupname;
  const cosupervisor = req.body.cosupervisor;

  const filter = { groupname: groupname};
  const update = { cosupervisor: cosupervisor };

  Group.findOneAndUpdate(filter, {$set:{cosupervisor:cosupervisor }}, {new: true}, (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }

    // console.log(doc);
});

});

//add supervisor
router.route('/update/supervisor').post((req, res) => {

  const groupname = req.body.groupname;
  const supervisor = req.body.supervisor;

  const filter = { groupname: groupname};
  const update = { supervisor: supervisor };

  Group.findOneAndUpdate(filter, {$set:{supervisor:supervisor }}, {new: true}, (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }

    // console.log(doc);
});

});



module.exports = router;