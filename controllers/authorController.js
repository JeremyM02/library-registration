const {Author, Books, BooksAuthors} = require(`../models`);


//view_all
module.exports.viewAll = async function(req, res){
    const authors = await Author.findAll();
    res.render('author/view_all', {authors});
};

//profile
module.exports.viewProfile = async function(req, res) {
    const author = await Author.findByPk(req.params.id, {
        include: 'books'
    });
    const books = await Books.findAll();
    let availableBooks = [];
    for (let i=0; i<books.length; i++) {
        if (!authorHasBook(author, books[i])){
            availableBooks.push(books[i]);
        }
    }
    res.render('author/profile', {author, availableBooks})
};
//render add
module.exports.renderAddForm = function (req, res) {
    const author = {
        first_name: '',
        last_name: '',
        date_of_birth: '',
    };
    res.render('author/add', {author});
};

//add
module.exports.addAuthor = async function(req, res) {
    const author = await Author.create( {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth
    });
    res.redirect(`/authors/profile/${author.id}`);
};

//render edit
module.exports.renderEditForm = async function(req, res) {
    const author = await Author.findByPk(req.params.id);
    res.render('author/edit', {author});
};

//update
module.exports.updateAuthor = async function(req, res) {
    await Author.update( {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth

    }, {
        where: {
            id: req.params.id
        }
    });
    res.redirect(`/authors/profile/${req.params.id}`);
};

//delete
module.exports.deleteAuthor = async function(req,res) {
    await Author.destroy({
        where: {
            id: req.params.id
        }
    });
    res.redirect('/author');
};

//Add author to book
module.exports.includeAuthor = async function (req, res) {

    await BooksAuthors.create({
        author_id: req.params.authorId,
        book_id: req.body.book
    })
    res.redirect(`/authors/profile/${req.params.authorId}`)
}

module.exports.removeBook = async function(req, res) {
    await BooksAuthors.destroy( {
        where: {
            author_id: req.params.authorId,
            book_id: req.params.bookId
        }
    });
    res.redirect(`/authors/profile/${req.params.authorId}`)
}
function authorHasBook(author, book) {
    for (let i=0; i<author.books.length; i++){
        if (book.id === author.books[i].id) {
            return true
        }
    }
    return false
}
