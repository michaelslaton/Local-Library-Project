function findAuthorById(authors, id) {
  let result;
  for (const author of authors) {
    if (id === author.id) result = author;
  }
  return result;
}

function findBookById(books, id) {
  let result;
  for (const book of books) {
    if (id === book.id) result = book;
  }
  return result;
}

function partitionBooksByBorrowedStatus(books) {
  result = [];
  result.push(books.filter((book) => book.borrows[0].returned === false));
  result.push(books.filter((book) => book.borrows[0].returned === true));
  return result;
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  let { borrows } = book;
  borrows.forEach((borrow) => {
    const account = accounts.find((account) => account.id === borrow.id);
    const { id, picture, age, name, company, email, registered } = account;
    result.push({
      id,
      returned: borrows[0].returned,
      picture,
      age,
      name,
      company,
      email,
      registered,
    });
  });
  return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
