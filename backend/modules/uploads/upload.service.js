import cloudinary from '../../config/cloudinary.js';
import streamifier from 'streamifier';

export const uploadToCloudinary = (buffer, folder = 'products') => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: 'image',
                transformation: [
                    { quality: 'auto', fetch_format: 'auto' }
                ]
            },
            (error, result) => {
                if (error) return reject(error);

                resolve({
                    url: result.secure_url,
                    public_id: result.public_id
                });
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });
};