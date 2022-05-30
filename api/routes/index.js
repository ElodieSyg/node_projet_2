const express = require('express');
const router = express.Router();
// Controllers
const AuthorController = require('../controllers/author');
const PublisherController = require('../controllers/publisher');
const BookController = require('../controllers/book');

/* Authors. */
router.route('/author').get(AuthorController.get);
router.route('/author').post(AuthorController.post);
router.route('/author/:id').put(AuthorController.put);
router.route('/author/:id').get(AuthorController.getOne);
router.route('/author/:id').delete(AuthorController.delete);

/* Publishers. */
router.route('/publisher').get(PublisherController.get);
router.route('/publisher').post(PublisherController.post);
router.route('/publisher/:id').put(PublisherController.put);
router.route('/publisher/:id').get(PublisherController.getOne);
router.route('/publisher/:id').delete(PublisherController.delete);

/* Books. */
router.route('/book').get(BookController.get);
router.route('/book').post(BookController.post);
router.route('/book/:id').put(BookController.put);
router.route('/book/:id').get(BookController.getOne);
router.route('/book/:id').delete(BookController.delete);

module.exports = router;
