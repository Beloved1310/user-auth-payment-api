class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Interbal server error';
        this.status = 500;
    }
}

module.exports = ServerError;
