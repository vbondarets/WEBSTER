class ApiError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static badRequest(message = "Bad Request") {
        return new ApiError(400, message);
    }

    static notAuth(message = "Not authorized") {
        return new ApiError(401, message);
    }

    static forbidden(message = "No access") {
        return new ApiError(403, message);
    }

    static notFound(message = "Not Found") {
        return new ApiError(404, message);
    }

    static conflict(message = "Data conflict") {
        return new ApiError(409, message);
    }

    static internal(message = "Internal Server Error") {
        return new ApiError(500, message);
    }
}

module.exports = ApiError;