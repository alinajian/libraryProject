
const controller = {};
const Book = require('../model/Book');

controller.getBook = async (req, res) => {
    const { id } = req.params;
    console.log(req.query)
    if (id) {
        try {
            const foundBook = await Book.findById(id);
            res.send(foundBook);
        } catch (e) {
            res.send('Book not found!');
        }
    } else {
        res
            .status(500)
            .send({
                status: 500,
                msg: 'Please provide book id',
                data: {}
            })
    }
}

controller.getBooks = async (req, res) => {
    try {
        // Paginate
        const  offset = req.body ? (req.body.offset ? parseInt(req.body.offset) : 0) : 0;
        const limit = req.body ? (req.body.limit ? parseInt(req.body.limit) : 10) : 10;
        const books = await Book.paginate({},{offset,limit});


        res.json(books);
    } catch (E) {
        console.log(E);
        res.send('ERROR \n', E);
    }
};

controller.storeBook = async (req, res) => {
    try {
        const { title } = req.body;
        console.log(req.body)
        if (!title) {
            res.send({
                status: false,
                msg: 'Please provide the book title'
            });
        }
        else {
            const newBook = await new Book(req.body).save();
            res.send(newBook);
        }
    } catch (e) {
        res.send(e);
    }
}


controller.editBook = async (req, res) => {
    const { id } = req.params;
    try {
        const newBook = await Book.findByIdAndUpdate(id, req.body, { upsert: true, new: true });
        res.json(newBook);
    } catch (e) {
        res.send('ERROR', e);
    }
}


controller.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await User.findByIdAndDelete(id);
        res.json(deletedBook);
    } catch (e) {
        res.send('ERROR', e);
    }
}


module.exports = controller;

