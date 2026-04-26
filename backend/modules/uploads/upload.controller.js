import { uploadToCloudinary } from './upload.service.js';
import db from '../../config/db.js';

export const uploadImages = async (req, res) => {
    try {
        const { product_id } = req.body;

        if (!product_id) {
            return res.status(400).json({
                success: false,
                message: 'product_id is required'
            });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No files uploaded'
            });
        }

        const uploads = await Promise.all(
            req.files.map(file =>
                uploadToCloudinary(file.buffer, 'products')
            )
        );

        const inserted = [];

        for (const img of uploads) {
            const result = await db.query(
                `INSERT INTO product_images (product_id, url, public_id)
                 VALUES ($1, $2, $3)
                 RETURNING *`,
                [product_id, img.url, img.public_id]
            );

            inserted.push(result.rows[0]);
        }

        return res.status(201).json({
            success: true,
            data: inserted
        });

    } catch (err) {
        console.error('Upload Images Error:', err);

        return res.status(500).json({
            success: false,
            message: 'Upload failed'
        });
    }
};