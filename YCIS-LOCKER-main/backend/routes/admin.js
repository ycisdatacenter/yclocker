const express = require('express');
const router = express.Router();
const { auth, isSuperAdmin } = require('../middleware/auth');
const { getAllUsers, getAllDocuments } = require('../controllers/adminController');

router.get('/users', auth, isSuperAdmin, getAllUsers);
router.get('/documents', auth, isSuperAdmin, getAllDocuments);

module.exports = router;