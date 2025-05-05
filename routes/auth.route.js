const express = require('express')
const router = express.Router();
const upload = require('../utils/multer'); // we’ll define this next
const { userLogin, userRegister, getUserId} = require('../controller/auth.controller.js');


// set up multer
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

router.post('/register', upload.none(), userRegister);
router.post('/login', upload.none(), userLogin);
router.post('/get-user', upload.none(), getUserId);



module.exports = router;