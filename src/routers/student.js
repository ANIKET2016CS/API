const express = require("express");
const router = new express.Router();

const Student = require("../models/students")


//Create a new students
router.post("/students", (req, res) => {
    //console.log(req.body);
    const user = new Student(req.body);

    user.save().then( () => {
        res.status(201).send(user);
    }).catch( (e) => {
        res.status(400).send(e);
    })
})



//Read the data of registered student
router.get("/students", async(req, res) => {
    try{
        const studeentsData = await Student.find();
        res.send(studeentsData);
    }catch(e){
        res.send(e);
    }
})

//Get individual student data based on unique id generated by mongodb
router.get("/students/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const studentData = await Student.findById({_id:_id})
        if(!studentData){
            return res.status(404).send();
        }else{
            res.send(studentData);
        }
    }catch(e){
        res.status(500).send(e);
    }
})

//Update the student by its id
router.patch("/students/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {new: true});
        res.send(updateStudent);
    }catch(e){
        res.status(400).send(e);
    }
})

//Delete the student by its id
router.delete("/students/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(_id);
        if(!_id){
            return res.status(400).send();      //status code 400 means Bad request i.e. data not present
        }else{
            res.send(deleteStudent);
        }
    }catch(e){
        res.status(500).send(e);    //status code 500 means server error
    }
})


module.exports = router;
