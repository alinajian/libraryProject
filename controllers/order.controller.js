const controller = {};
const Order = require('../model/Order');
const User = require('../model/User');
const Book = require('../model/Book');
controller.submitNewOrder = async (req, res) => {
    try {
        let {userid, bookid, quantity} = req.body;
        quantity = parseInt(quantity);
        let foundUser, foundBook;
        console.log(req.body)
        if (!userid) {
            res.send({
                status: false,
                msg: 'Please provide the userid'
            });
            return;
        }
        else {
            try {
                foundUser = await User.findById(userid);
                if (!foundUser) {
                    res.send({
                        status: false,
                        msg: 'User Not Found'
                    });
                    return;
                }
                //res.send(foundUser);
            } catch (e) {
                res.send({
                    status: false,
                    msg: 'User Not Found'
                });
                return;
            }
        }
        if (!bookid) {
            res.send({
                status: false,
                msg: 'Please provide the bookid'
            });
            return;
        }
        else {
            try {
                foundBook = await Book.findById(bookid);
                if (!foundBook) {
                    res.send({
                        status: false,
                        msg: 'Book Not Found'
                    });
                    return;
                }
                if (foundBook.quantity === 0) {
                    res.send({
                        status: false,
                        msg: 'This book is not available in stock'
                    });
                    return;
                }
                if (quantity > foundBook.quantity) {
                    res.send({
                        status: false,
                        msg: 'Quantity you entered is more than available in stock!'
                    });
                    return;
                }

                //res.send(foundUser);
            } catch (e) {
                res.send({
                    status: false,
                    msg: 'Book Not Found'
                });
                return;
            }
        }
        if (quantity < 1) {
            res.send({
                status: false,
                msg: 'Please provide the correct quantity'
            });
            return;
        }
        const data = {user: userid, book: bookid, quantity: quantity};
        const newOrder = await new Order(data).save();
        //update stock quantity
        foundBook.quantity -= quantity;

        //update Book users
        let bookUsers = foundBook.users && Array.isArray(foundBook.users) ? foundBook.users : [];
        bookUsers.push(userid);
        foundBook.users = bookUsers;
        await  foundBook.save();

        //update User books
        let userBooks = foundUser.books && Array.isArray(foundUser.books) ? foundUser.books : [];

        userBooks.push(bookid);
        foundUser.books = userBooks;

        await  foundUser.save();


        res.send(newOrder);

    } catch (e) {
        res.send(e);
    }
}

controller.getOrders = async (req, res) => {
    try {
        // Paginate
        const offset = req.body ? (req.body.offset ? parseInt(req.body.offset) : 0) : 0;
        const limit = req.body ? (req.body.limit ? parseInt(req.body.limit) : 10) : 10;
        const orders = await Order.paginate({}, {offset, limit});
        res.json(orders);
    } catch (E) {
        console.log(E);
        res.send('ERROR \n', E);
    }
};


module.exports = controller;

