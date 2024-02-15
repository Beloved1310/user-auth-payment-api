class NotFoundError extends Error {
    constructor(entity) {
        super(`${entity} not found`);
        this.name = 'NotFoundError';
        this.status = 404;
    }
}

module.exports = NotFoundError;
