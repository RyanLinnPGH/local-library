//helper function
function findById(array, id) {
  const results = array.find((element) => {
    if (element.id === id) {
      return element;
    }
  });
  return results;
}
function findAuthorById(authors, id) {
  return findById(authors, id);
}
function findBookById(books, id) {
  return findById(books, id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = books.filter((book) => !book.borrows[0].returned);
  const returned = books.filter((book) => book.borrows[0].returned);
  const partitionedBooks = [borrowed, returned];
  return partitionedBooks;

  /* let borrowedBooks = [];
  let returnedBooks = [];
  for (const book of books) {
    if (book.borrows[0].returned === false) {
      borrowedBooks.push(book);
    } else if (book.borrows[0].returned === true) {
      returnedBooks.push(book);
    }
  }
  return [borrowedBooks, returnedBooks];
*/
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  let borrowedArray = book.borrows;
  borrowedArray.forEach((borrow) => {
    let account = accounts.find((acc) => acc.id === borrow.id);
    account.returned = borrow.returned;
    result.push(account);
  });
  return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
