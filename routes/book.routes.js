const router = require('express').Router();
const controller = require('../controllers/book.controller');

// List of books
router.get('/', controller.getBooks);
// Get Book
router.get('/:id', controller.getBook);
// Store new user
router.post('/', controller.storeBook);
// Edit user
router.put('/:id', controller.editBook);
// Delete user
router.delete('/:id', controller.deleteBook);


module.exports = router;