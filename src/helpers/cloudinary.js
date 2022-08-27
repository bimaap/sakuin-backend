const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: process.env.CLAUDI_NAME, 
    api_key: process.env.CLAUDI_API_KEY, 
    api_secret: process.env.CLAUDI_API_SECRET 
  });

module.exports = cloudinary