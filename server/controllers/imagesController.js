const { Photos } = require('../models/models');
const ApiError = require("../helpers/error/ApiError");
const downloadImageURL = require('../helpers/downloadImgURL');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

class ImagesController {
    async getImages(req, res, next) {
        try {
            const { id } = req.user;
            const photos = await Photos.findAll({ where: { userId: id } });
            const AI_count = await Photos.findAndCountAll({ where: { userId: id, AI: true } });
            const edit_count = await Photos.findAndCountAll({ where: { userId: id, AI: false } });
            return res.json({ photos, AI_count, edit_count });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal(`Unknown error: ${error}`));
        }
    }

    async save_image(req, res, next) {
        try {
            const { id } = req.user;
            const { url, format } = req.body;
            const data = url.replace(/^data:image\/\w+;base64,/, "");
            const filename = `${uuid.v4()}.${format}`;
            const imgPath = path.resolve(__dirname, '../static/images', filename);
            const buf = Buffer.from(data, 'base64');
            fs.writeFileSync(imgPath, buf);
            await Photos.create({ userId: id, photo: `${process.env.DOMAIN}/api/images/${filename}`, AI: false });
            return res.json({ message: 'Created!' });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal(`Unknown error: ${error}`));
        }
    }

    async save_telegram_image(req, res, next) {
        try {
            const { id, url } = req.body;
            const path = await downloadImageURL(url);
            await Photos.create({ userId: id, photo: path, AI: true });
            return res.json({ message: 'Created!' });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal(`Unknown error: ${error}`));
        }
    }
}

module.exports = new ImagesController();