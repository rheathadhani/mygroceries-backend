const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controller/adminAuthController'); 

router.post('/admin/login', adminLogin);

module.exports = router;
