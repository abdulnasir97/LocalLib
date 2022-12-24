function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((borrowCount, {borrows}) => {
    const mostRecent = borrows[0];
    if (!mostRecent.returned) borrowCount++;
    return borrowCount;
  }, 0);
}

function getMostCommonGenres(books) {
  let genreMap = {};
  books.forEach((num) => {
   if (genreMap[num.genre]) {
    genreMap[num.genre]++;
   } else {
    genreMap[num.genre] = 1;
   }
  });
  return Object.entries(genreMap)
   .map(([name, count]) => {
    return {
     name,
     count
    };
   })
   .sort((alpha, bravo) => bravo.count - alpha.count)
   .slice(0, 5);
 }
 
 function getMostPopularBooks(books) {
  let mostPopularBooks = [];

  const borrowed = books.reduce((acc, book) => {
    mostPopularBooks.push({ name: book.title, count: book.borrows.length });
  }, []);

  return mainFive(mostPopularBooks);
}

function mainFive(array) {
  let topPopularBooks = array

    .sort((countA, countB) => (countA.count < countB.count ? 1 : -1))
    .slice(0, 5);

  return topPopularBooks;
}



function getMostPopularAuthors(books, authors) {
  let result = [];
  authors.forEach((author) => {
   let theAuthor = {
    name: `${author.name.first} ${author.name.last}`,
    count: 0
   };
   books.forEach((book) => {
    if (book.authorId === author.id) {
     theAuthor.count += book.borrows.length;
    }
   });
   result.push(theAuthor);
  });
  return result.sort((alpha, bravo) => bravo.count - alpha.count).slice(0, 5);
 }
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
