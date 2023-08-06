const multer = require('multer');
const path = require('path');

exports.multerupload=()=>{
const storage = multer.diskStorage({
  destination: './views/public/images/',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const originalExtension = path.extname(file.originalname);
    const modifiedFilename = uniqueSuffix + originalExtension;
    cb(null, modifiedFilename);
  },
});

const allowedTypes = ['.jpg', '.jpeg', '.png', '.gif']; // Add more allowed file extensions if needed

const fileFilter = function (req, file, cb) {
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(fileExtension)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type'));
  }
};

return multer({ storage: storage, fileFilter: fileFilter });
}