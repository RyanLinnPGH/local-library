function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const currentlyBorrowed = books.reduce((accu, value) => {
    if (!value.borrows[0].returned) {
      accu++;
    }
    return accu;
  }, 0);
  return currentlyBorrowed;
}

/*let total = 0;
  for (const book of books) {
    if (book.borrows[0].returned === false) {
      total += 1;
    }
  }
  return total;
}*/

function getMostCommonGenres(books) {
  const genreObj = {};
  books.forEach((book) => {
    if (genreObj[book.genre]) {
      genreObj[book.genre]++;
    } else {
      genreObj[book.genre] = 1;
    }
  });
  const genreNames = Object.keys(genreObj);
  const genresArray = [];
  for (let i = 0; i < genreNames.length; i++) {
    genresArray.push({ name: genreNames[i], count: genreObj[genreNames[i]] });
  }
  return genresArray.sort((genreA, genreB) => {
    return genreB.count - genreA.count;
  }).slice(0, 5);
}

function getMostPopularBooks(books) {
  const popularBooks = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));
  popularBooks.sort((bookA, bookB) => bookB.count - bookA.count);
  return popularBooks.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let result = [];
  authors.forEach((author) => {
    let theAuthor = {
      name: `${author.name.first} ${author.name.last}`,
      count: 0,
    };
    books.forEach((book) => {
      if (book.authorId === author.id) {
        theAuthor.count += book.borrows.length;
      }
    });
    result.push(theAuthor);
  });
  return result
    .sort((authorsA, authorsB) => authorsB.count - authorsA.count)
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
