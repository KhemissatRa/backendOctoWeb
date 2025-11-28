const Login= require("../controller/admin_controler").Login;

const express = require("express");
const router = express.Router();
router.post("/admin/login",Login);
module.exports = router;    

