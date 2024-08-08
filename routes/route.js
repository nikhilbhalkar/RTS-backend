const express = require("express");
const router = express.Router();
const {login,signup} = require("../Contoller/Auth");
const {auth} = require('../middleware/auth');
const { addEvent, getEvents } = require("../Contoller/Event");

//Routes for user login and register

router.post("/login",login);
router.post("/register",signup);

//Routes for Event create and Get

router.post("/events",auth,addEvent);
router.get("/events",auth,getEvents);



module.exports = router;