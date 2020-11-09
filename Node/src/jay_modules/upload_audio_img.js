const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const extMap = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../../../reactproj/public/images/podcaster_imgs/');
    },
    filename: function (req, file, cb) {
        let ext = extMap[file.mimetype];
        if (ext) {
            cb(null, uuidv4() + ext);
        } else {
            cb(new Error('錯誤！'));
        };
    }
});

const fileFilter = (req, file, cb) => {
    cb(null, !!extMap[file.mimetype]);
};

const upload_audio_img = multer({ storage, fileFilter });

module.exports = upload_audio_img;
