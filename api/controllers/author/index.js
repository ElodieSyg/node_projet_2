const Author = require('../../models/author');

module.exports = {
    get: async (req, res) => {
        const authors = await Author.find();

        if (!authors) {
            return res.status(404).json({
                message: 'authors not found',
                status: 'failed',
                data: [],
            });
        };

        return res.status(200).json({
            message: 'get all authors',
            status: 'success',
            data: authors,
        });
    },
    post: async (req, res) => {
        const { firstName, lastName, age } = req.body;

        if (firstName && lastName && age) {
            const author = await Author.create({
                firstName,
                lastName,
                age,
            });

            if (author) {
                return res.status(201).json({
                    message: 'author succefully creatted',
                    status: 'success',
                    data: author,
                });
            };
        };

        return res.status(500).json({
            message: 'internal server error',
            status: 'failed',
        });
    },
    put: async (req, res) => {
        const { firstName, lastName, age } = req.body;
        const { id } = req.params;

        const author = await Author.findByIdAndUpdate({ _id: id }, {
            firstName,
            lastName,
            age,
        });

        if (!author) {
            return res.status(404).json({
                message: 'author not found',
                status: 'failed',
                data: [],
            });
        };

        return res.status(200).json({
            message: 'author succefully updated',
            status: 'success',
        });
    },
    getOne: async (req, res) => {
        const { id } = req.params;

        const author = await Author.findById({ _id: id });

        if (!author) {
            return res.status(404).json({
                message: 'author not found',
                status: 'failed',
                data: [],
            });
        };

        return res.status(200).json({
            status: 'success',
            data: author,
        });
    },
    delete: async (req, res) => {
        const { id } = req.params;

        const author = await Author.findByIdAndDelete({ _id: id });

        if (!author) {
            return res.status(404).json({
                message: 'author not found',
                status: 'failed',
                data: [],
            });
        };

        return res.status(200).json({
            message: 'author succefully deleted',
            status: 'success',
            data: author,
        });
    },
};