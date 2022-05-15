const router = require("express").Router();
const { Student, validate } = require("../../models/userManagement-models/registrationStudent.model");
const bcrypt = require("bcrypt");

router.post("/" , async (req, res) => {
    try{
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message: error.details[0].message });

            const user = await Student.findOne({ studentEmail: req.body.studentEmail});

            if (student)
            return res.status(409).send({ message: "User with given email already exist!"})

            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.studentPassword, salt);

            await new Student({...req.body, studentPassword:hashPassword}).save();
            res.status(201).send({message: "User registration Successfully!"})
        
    }catch(error){
        res.status(500).send({message: "Internal server error!"})
    }
});

module.exports = router;