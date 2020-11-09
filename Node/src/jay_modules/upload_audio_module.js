const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const extMap = {
    'audio/mp4': '.mp4',
    'audio/mpeg': '.mp3',
    'audio/m4a': '.m4a',
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../../../reactproj/public/audios/');
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

const upload_audio_module = multer({ storage, fileFilter });

module.exports = upload_audio_module;
