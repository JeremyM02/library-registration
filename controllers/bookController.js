const {Titles} = require('../models');

//view all
module.exports.viewAll = async function(req, res){
    const books = await Titles.findAll();
    res.render('books/view_all', {books});
};

//profile

//render add form

//add

//render edit form

//update

//delete