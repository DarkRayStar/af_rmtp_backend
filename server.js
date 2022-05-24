const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fileRoute = require('./routes/admin-routes/adminFile');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  'useNewUrlParser': true
}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const adminFileUploadRouter = require('./routes/admin-routes/adminFile');
const adminSubmissionRouter = require('./routes/admin-routes/submissionType');

const groupRouter = require('./routes/student-routes/groups');
const researchTopicRouter = require('./routes/supervisor-routes/researchTopic');

const studentDetailRouter = require('./routes/userManagement-routes/studentDetail');
const staffDetailRouter = require('./routes/userManagement-routes/staffDetail');

const studentRegistrationRoute = require('./routes/userManagement-routes/studentRegistrations');
const studentLoginRoute = require('./routes/userManagement-routes/studentLogins');

const employeeRegistrationRoute = require('./routes/userManagement-routes/employeeRegistrations');
const employeeLoginRoute = require('./routes/userManagement-routes/employeeLogins');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/admin', adminFileUploadRouter);
app.use('/admin/submissionType', adminSubmissionRouter);
app.use('/groups', groupRouter);

app.use('/supervisor/topic', researchTopicRouter);

app.use('/studentDetails', studentDetailRouter);
app.use('/employeeDetails', staffDetailRouter);

app.use("/student/registration", studentRegistrationRoute);
app.use("/student/login", studentLoginRoute);

app.use("/employee/registration", employeeRegistrationRoute);
app.use("/employee/login", employeeLoginRoute);

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(fileRoute);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
