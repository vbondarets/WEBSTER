const ApiError = require("../helpers/error/ApiError");

class ImagesController {
    async getImages(req, res, next) {
        try {
            console.log(req.body);
            return res.send("aboba");
        } catch (error) {
            console.log(error);
            return next(ApiError.internal(`Unknown error: ${error}`));
        }
    }
    async postImage(req, res, next) {
        try {
            console.log(req.body);
            return res.send("aboba");
        } catch (error) {
            console.log(error);
            return next(ApiError.internal(`Unknown error: ${error}`));
        }
    }
}

module.exports = new ImagesController();