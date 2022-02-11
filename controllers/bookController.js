const {Books, Author, BooksAuthors} = require('../models');
const genres = ['Classic', 'Historical Fiction', 'Young Adult Fiction', 'Modern'].sort();

//view all
module.exports.viewAll = async function(req, res) {
    const books = await Books.findAll();
    res.render('book/view_all', {books});
};

//profile
module.exports.viewProfile = async function(req, res) {
    const book = await Books.findByPk(req.params.id, {
        include: 'authors'
    });
    const authors = await Author.findAll();
    let availableAuthors = [];
    for (let i=0; i<authors.length; i++) {
        if (!bookHasAuthor(book, authors[i])){
            availableAuthors.push(authors[i]);
        }
    }
    res.render('book/profile', {book, availableAuthors});
};

//render add form
module.exports.renderAddForm = function(req, res) {
    const book = {
        title: '',
        publisher: '',
        genre: genres[0],
        page_amount: '',
        cover_image: '',
        description: ''
    };
    res.render('book/add', {book, genres});
};

//add
module.exports.addBook = async function(req, res) {
    const book = await Books.create( {
        title: req.body.title,
        publisher: req.body.publisher,
        genre: req.body.genre,
        page_amount: req.body.page_amount,
        cover_image: req.body.cover_image,
        description: req.body.description
    });
    res.redirect(`/books/profile/${book.id}`);
};

//render edit form
module.exports.renderEditForm = async function(req, res) {
    const book = await Books.findByPk(req.params.id);
    res.render('book/edit', {book, genres});
};

//update
module.exports.updateBook = async function(req, res) {
    await Books.update( {
        title: req.body.title,
        publisher: req.body.publisher,
        genre: req.body.genre,
        page_amount: req.body.page_amount,
        cover_image: req.body.cover_image,
        description: req.body.description
    }, {
        where: {
            id: req.params.id
        }
    });
    res.redirect(`/books/profile/${req.params.id}`);
};

//delete
module.exports.deleteBook = async function(req, res) {
    await Books.destroy( {
        where: {
            id: req.params.id
        }
    });
    res.redirect(`/books`);
};

module.exports.includeAuthor = async function (req, res) {
    await BooksAuthors.create({
        author_id: req.body.author,
        book_id: req.params.bookId
    });
    res.redirect(`/books/profile/${req.params.bookId}`)
}


module.exports.removeAuthor = async function(req, res) {
    await BooksAuthors.destroy( {
        where: {
            book_id: req.params.bookId,
            author_id: req.params.authorId
        }
    });
    res.redirect(`/books/profile/${req.params.bookId}`);
};

function bookHasAuthor(book, author) {
    for (let i=0; i<book.authors.length; i++){
        if (author.id === book.authors[i].id) {
            return true
        }
    }
    return false
}