const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

//filename extension
const extMap = {
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/gif': '.gif'
}

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        //save in public/img
        cb(null, __dirname + '/../public/img');
    },
    filename: function (req, file, cb) {
        let ext = extMap[file.mimetype];
        if (ext) {
            cb(null, uuidv4() + ext);
        } else {
            cb(new Error('檔案格式錯誤'));
        }
    }
});

let fileFilter = function (req, file, cb) {
    cb(null, !!extMap[file.mimetype]);
};

module.exports = multer({ storage,fileFilter });