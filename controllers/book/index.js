const Book = require('../../models/book');

module.exports = {
    get: async (req, res) => {
        const books = await Book.find();

        if (!books) {
            return res.status(404).json({
                message: 'books not found',
                status: 'failed',
                data: [],
            });
        };

        return res.status(200).json({
            message: 'get all books',
            status: 'success',
            data: books,
        });
    },
    post: async (req, res) => {
        const { title, description, author, publisher } = req.body;

        if (title && description && author && publisher) {
            const book = await Book.create({
                title,
                description,
                publication_date: new Date(),
                author,
                publisher,
            });

            if (book) {
                return res.status(201).json({
                    message: 'book succefully creatted',
                    status: 'success',
                    data: book,
                });
            };
        };

        return res.status(500).json({
            message: 'internal server error',
            status: 'failed',
        });
    },
    put: async (req, res) => {
        const { title, description } = req.body;
        const { id } = req.params;

        const book = await Book.findByIdAndUpdate({ _id: id }, {
            title,
            description,
        });

        if (!book) {
            return res.status(404).json({
                message: 'book not found',
                status: 'failed',
                data: [],
            });
        };

        return res.status(200).json({
            message: 'book succefully updated',
            status: 'success',
            data: book,
        });
    },
    getOne: async (req, res) => {
        const { id } = req.params;

        const book = await Book.findById({ _id: id });

        if (!book) {
            return res.status(404).json({
                message: 'book not found',
                status: 'failed',
                data: [],
            });
        };

        return res.status(200).json({
            status: 'success',
            data: book,
        });
    },
    delete: async (req, res) => {
        const { id } = req.params;

        const book = await Book.findByIdAndDelete({ _id: id });

        if (!book) {
            return res.status(404).json({
                message: 'book not found',
                status: 'failed',
                data: [],
            });
        };

        return res.status(200).json({
            message: 'book succefully deleted',
            status: 'success',
            data: book,
        });
    },
};