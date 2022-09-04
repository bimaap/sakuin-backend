const path = require('path')
const multer = require('multer')
const cloudinary = require('./cloudinary')
const {CloudinaryStorage} = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage ({
    cloudinary: cloudinary,
    params: {
      folder: 'sakuin',
      format: async (req, file) => {
        const ext = file.mimetype.split('/')[1];
        return ext;
      },
      public_id: (req, file) => {
        const user = req.authResult.email.split('@')[0]
        return user
      }
    }
  })

const type_file = [
    'image/jpeg',
    'image/jpg',
    'image/png'
]

const upload = multer({
    storage,
    limits: {
        fileSize: Number(process.env.LIMIT_FILE_SIZE) * 1000 * 1000
    },
    fileFilter: (req, file, cb) => {
      if (!type_file.includes(file.mimetype)) {
          return cb(new Error('File is not allowed'))
      }
      cb(null, true)
    }
})

module.exports = upload