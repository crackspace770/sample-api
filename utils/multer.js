const multer = require('multer');

const storage = multer.memoryStorage(); // use diskStorage if needed

const upload = multer({ storage });

module.exports = upload;
