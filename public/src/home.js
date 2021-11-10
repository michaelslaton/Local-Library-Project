function sortByCount(array) {
  array.sort((entryA, entryB) => (entryA.count < entryB.count ? 1 : -1));
}

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    if (!book.borrows[0].returned) {
      acc++;
    }
    return acc;
  }, 0);
}

function getMostCommonGenres(books) {
  let genreList = {};
  for (let book of books) {
    const current = genreList[book.genre];
    if (current) {
      genreList[book.genre]++;
    } else {
      genreList[book.genre] = 1;
    }
  }
  const result = Object.keys(genreList).map((key) => {
    return { name: key, count: genreList[key] };
  });
  sortByCount(result);
  return result.slice(0, 5);
}

function getMostPopularBooks(books) {
  const bookList = books.sort((bookA, bookB) =>
    bookA.borrows.length > bookB.borrows.length ? -1 : 1
  );
  let top5Books = [];
  for (let i = 0; i < 5; i++) {
    top5Books.push(
      (bookList[i] = {
        name: bookList[i].title,
        count: bookList[i].borrows.length,
      })
    );
  }
  return top5Books;
}

function getMostPopularAuthors(books, authors) {
  const authorsCount = {};
  books.forEach((book) => {
    const current = authorsCount[book.authorId];
    if (current) {
      authorsCount[book.authorId] += book.borrows.length;
    } else {
      authorsCount[book.authorId] = book.borrows.length;
    }
  });
  const orgAuthors = Object.keys(authorsCount).map((key) => {
    const author = authors.find((author) => author.id === Number(key));
    const name = `${author.name.first} ${author.name.last}`;
    return { name, count: authorsCount[key] };
  });
  sortByCount(orgAuthors);
  return orgAuthors.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
