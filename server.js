const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
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
const fileRoute = require('./routes/admin-routes/adminFile');
const markingSchemeRouter = require('./routes/admin-routes/markingScheme');

const groupRouter = require('./routes/student-routes/groups');
const stuSubmissionRouter = require('./routes/student-routes/stuSubmission')
const researchTopicRouter = require('./routes/supervisor-routes/researchTopic');
const chatRouter = require('./routes/supervisor-routes/chat');

const studentDetailRouter = require('./routes/userManagement-routes/studentDetail');
const staffDetailRouter = require('./routes/userManagement-routes/staffDetail');

const studentRegistrationRoute = require('./routes/userManagement-routes/studentRegistrations');
const studentLoginRoute = require('./routes/userManagement-routes/studentLogins');
const employeeRegistrationRoute = require('./routes/userManagement-routes/employeeRegistrations');
const employeeLoginRoute = require('./routes/userManagement-routes/employeeLogins');
const studentPasswordResetRoute = require('./routes/userManagement-routes/passwordReset/passwordReset');
const employeePasswordResetRoute = require('./routes/userManagement-routes/passwordReset/empPasswordReset');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/admin', adminFileUploadRouter);
app.use('/admin/submissionType', adminSubmissionRouter);

app.use('/admin/marking', markingSchemeRouter);

app.use('/groups', groupRouter);
app.use('/student-submission', stuSubmissionRouter);

app.use('/supervisor/topic', researchTopicRouter);
app.use('/chat', chatRouter);

app.use('/studentDetails', studentDetailRouter);
app.use('/employeeDetails', staffDetailRouter);

app.use("/student/registration", studentRegistrationRoute);
app.use("/student/login", studentLoginRoute);
app.use("/employee/registration", employeeRegistrationRoute);
app.use("/employee/login", employeeLoginRoute);
app.use("/student/password-reset" , studentPasswordResetRoute);
app.use("/employee/password-reset" , employeePasswordResetRoute);

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(fileRoute);
app.use(markingSchemeRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
