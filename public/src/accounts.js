function findAccountById(accounts, id) {
  let findByID = accounts.find((account) => account.id === id);
  return findByID;
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  let totalBorrowed = 0;
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].borrows.length; j++) {
      if (account.id === books[i].borrows[j].id) {
        totalBorrowed += 1;
      }
    }
  }
  return totalBorrowed;
}

//THIS IS THE HELPER FUNCTION.
function findAuthor (book, authors) {
  const author = authors.find((author) => author.id === book.authorId);
  return author;
}

function getBooksPossessedByAccount(account, books, authors) {
  const matchBorrowed = [];
  books.forEach((book) => {
    let bookBorrows = book.borrows;
    bookBorrows.forEach((borrow) => {
      if (borrow.id === account.id && !borrow.returned) {
        matchBorrowed.push(book);
      }
    });
  });
  let result = matchBorrowed.map((book) => {
    return { ...book, author: findAuthor(book, authors) };
  });
  return result;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};