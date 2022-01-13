let myLibrary = [];

const bookDisplay = document.querySelector(".book-display");
const addBook = document.querySelector("#add-book");
const plusBtn = document.querySelector(".add-book");

const form = document.querySelector("form");
const newBookTitle = document.querySelector("input[name='title']");
const newBookAuthor = document.querySelector("input[name='author']");
const newBookPages = document.querySelector("input[name='pages']");
const newBookRead = document.querySelector("input[name='read']");
const newBookAddBtn = document.querySelector("input[name='add-book']");
const newBookCancelBtn = document.querySelector("input[name='cancel-book']");


plusBtn.onclick = e => displayForm(e, form);
newBookAddBtn.onclick = e => addBookForm(e)
newBookCancelBtn.onclick = e => cancelAddBook();

addBookToLibrary("Spooder", "Peter Porker", 420, false)
addBookToLibrary("Man", "Parker", 234, true);

displayBooks(bookDisplay, myLibrary);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    let readString;
    read ? readString = "read" : readString = "not read yet";
    return `${title} by ${author}, ${pages} pages, ${readString}`;
};

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBook(newBook);
    return newBook;
}

function displayBooks(bookDisplay, libraryArr) {
    for (let book of libraryArr) {
        const bookBox = displayBook(book);
        bookDisplay.insertBefore(bookBox, addBook);
    }
}

function displayBook(book) {
    const bookBox = document.createElement("div");
    const bookTitle = document.createElement("p");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const bookRead = document.createElement("button");
    const bookDelete = document.createElement("button");

    bookBox.className = "book";
    bookTitle.className = "book-title";
    bookAuthor.className = "book-author";
    bookPages.className = "book-pages";
    bookRead.className = (book.read) ? "book-read" : "book-not-read";
    bookDelete.className = "book-delete";

    bookTitle.textContent = `${book.title}`;
    bookAuthor.textContent = book.author;
    bookPages.textContent = `${book.pages} pages`;
    bookRead.textContent = (book.read) ? "Read" : "Not read";
    bookDelete.textContent = "Delete";

    bookRead.onclick = e => toggleRead(e, bookRead);
    bookDelete.onclick = e => deleteBook(e);

    bookBox.appendChild(bookTitle);
    bookBox.appendChild(bookAuthor);
    bookBox.appendChild(bookPages);
    bookBox.appendChild(bookRead);
    bookBox.appendChild(bookDelete);
    return bookBox;
}

function toggleRead(e, bookRead) {
    let bookTitle = e.target.parentNode.firstChild.textContent;
    console.log(bookTitle);
    let book = myLibrary.filter(book => book.title === bookTitle)[0];
    console.log(book);
    if (book.read) {
        book.read = false;
        bookRead.textContent = "Not read";
        bookRead.className = "book-not-read";
    } else {
        book.read = true;
        bookRead.textContent = "Read";
        bookRead.className = "book-read";
    }
}

function getBook(bookTitle) {
    let book;
    for (let i = 0; i < myLibrary.length; i++) {
        let currentBook = myLibrary[i];
        if (currentBook.title === bookTitle) {
            book = currentBook;
            break;
        }
    }
    return book;
}

function deleteBook(e) {
    let bookTitle = e.target.parentNode.firstChild.textContent;
    console.log(bookTitle);
    let bookIndex = myLibrary.map(book => book.title).indexOf(bookTitle);
    console.log(bookIndex);

    if (confirm(`Are you sure you want to delete ${bookTitle} from the library?`)) {
        myLibrary.splice(bookIndex, 1);
        e.target.parentNode.remove();
    }
}

function displayForm(e, form) {
    let addBtn = e.target;
    addBtn.remove();
    form.style.display = "block";
}

function addBookForm(e) {
    let formNodes = e.target.parentNode.childNodes;
    let inputNodes = Array.from(formNodes).filter(node => node.nodeName === "INPUT").slice(0,4);
    let title = inputNodes[0].value;
    let author = inputNodes[1].value;
    let pages = inputNodes[2].value;
    let read = inputNodes[3].checked;
    let newBook = addBookToLibrary(title, author, pages, read);
    let bookBox = displayBook(newBook);
    bookDisplay.insertBefore(bookBox, addBook);

    // create a new plus button and hide the form again
    addBook.insertBefore(plusBtn, form);
    form.reset();
    form.style.display = "none";


}

function cancelAddBook() {
    form.style.display = "none";
    addBook.insertBefore(plusBtn, form);
}