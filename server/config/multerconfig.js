const multer = require('multer');

const storage = multer.memoryStorage();

const filehandler = (req, file, cb) => {
    console.log(file.mimetype);
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ storage, fileFilter: filehandler });
module.exports = upload;
