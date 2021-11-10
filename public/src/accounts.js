function findAccountById(accounts, id) {
  let result;
  for (const account of accounts) {
    if (id === account.id) result = account;
  }
  return result;
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  books.forEach((book) => {
    book.borrows.forEach((borrow) => {
      if (borrow.id === account.id) {
        total++;
      }
    });
  });
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  let openBooks = [];
  books.forEach((book) => {
    const { id, title, genre, authorId, borrows } = book;
    const author = authors.find((author) => author.id === book.authorId);
    if (borrows[0].id === account.id && !borrows[0].returned) {
      openBooks.push({ id, title, genre, author, authorId, borrows });
    }
  });
  return openBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
