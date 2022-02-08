const {Books} = require('../models');
const {genres} = ['classic', 'not classic'].sort();

//view all
module.exports.viewAll = async function(req, res){
    const books = await Books.findAll();
    res.render('books/view_all', {books});
};

//profile
module.exports.viewProfile = async function(req, res) {
    const book = await Books.findByPk(req.params.id);
    // const students = await Student.findAll();
    // let availableStudents = [];
    // for (let i=0; i<students.length; i++) {
    //     if (!courseHasStudent(course, students[i])){
    //         availableStudents.push(students[i]);
    //     }
    // }
    res.render('books/profile', {book});
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
module.exports.updateCourse = async function(req, res) {
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


// module.exports.removeBook = async function(req, res) {
//     await BooksAuthors.destroy( {
//         where: {
//             book_id: req.params.book_id,
//             author_id: req.params.author_id
//         }
//     });
//     res.redirect(`/books/profile/${req.params.bookId}`);
// };