const ResponseService = {
    success(res, message, data = null, meta = null) {
        const payload = {
            message,
            status: true,
            error: false,
        };
        if (data) payload.data = data;
        if (meta) payload.meta = meta;
        res.status(200).json(payload);
        return {};
    }
};

module.exports = ResponseService;
