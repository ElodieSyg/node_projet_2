const Publisher = require('../../models/publisher');

module.exports = {
    get: async (req, res) => {
        const publishers = await Publisher.find();

        if (!publishers) {
            return res.status(404).json({
                message: 'publishers not found',
                status: 'failed',
                data: [],
            });
        };

        return res.status(200).json({
            message: 'get all publishers',
            status: 'success',
            data: publishers,
        });
    },
    post: async (req, res) => {
        const { name } = req.body;

        if (name) {
            const publisher = await Publisher.create({
                name,
                creation_data: new Date(),
            });

            if (publisher) {
                return res.status(201).json({
                    message: 'publisher succefully creatted',
                    status: 'success',
                    data: publisher,
                });
            };
        };

        return res.status(500).json({
            message: 'internal server error',
            status: 'failed',
        });
    },
    put: async (req, res) => {
        const { name } = req.body;
        const { id } = req.params;

        const publisher = await Publisher.findByIdAndUpdate({ _id: id }, {
            name,
        });

        if (!publisher) {
            return res.status(404).json({
                message: 'publisher not found',
                status: 'failed',
                data: [],
            });
        };

        return res.status(200).json({
            message: 'publisher succefully updated',
            status: 'success',
        });
    },
    getOne: async (req, res) => {
        const { id } = req.params;

        const publisher = await Publisher.findById({ _id: id });

        if (!publisher) {
            return res.status(404).json({
                message: 'publisher not found',
                status: 'failed',
                data: [],
            });
        };

        return res.status(200).json({
            status: 'success',
            data: publisher,
        });
    },
    delete: async (req, res) => {
        const { id } = req.params;

        const publisher = await Publisher.findByIdAndDelete({ _id: id });

        if (!publisher) {
            return res.status(404).json({
                message: 'publisher not found',
                status: 'failed',
                data: [],
            });
        };

        return res.status(200).json({
            message: 'publisher succefully deleted',
            status: 'success',
            data: publisher,
        });
    },
};