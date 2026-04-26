import multer from 'multer';

const storage = multer.memoryStorage();

const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/jpg'
];

const fileFilter = (req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
        files: 5
    },
    fileFilter
});

export default upload;