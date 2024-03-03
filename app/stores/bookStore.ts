import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Book } from "../models/book";

export default class BookStore {
  bookRegistry = new Map<string, Book>();
  selectedBook: Book | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get booksById() {
    return Array.from(this.bookRegistry.values()).sort(
      (a, b) => parseInt(a.bookId) - parseInt(b.bookId)
    );
  }
  loadBooks = async () => {
    this.loadingInitial = true;
    try {
      const books = await agent.Books.list();
      books.forEach((book) => {
        this.setBook(book);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadBook = async (bookId: string) => {
    let book = this.getBook(bookId);
    if (book) {
      this.selectedBook = book;
    } else {
      this.loadingInitial = true;
      try {
        book = await agent.Books.details(bookId);
        this.setBook(book);
        runInAction(() => {
          this.selectedBook = book;
        })
        this.setLoadingInitial(false);
        return book;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };



  private setBook = (book: Book) => {
    this.bookRegistry.set(book.bookId, book);
  };

  private getBook = (bookId: string) => {
    return this.bookRegistry.get(bookId);
  };

  private getImage = (image: string) => {
    console.log(image);
    return this.bookRegistry.get(image);
    
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createBook = async (book: Book) => {
    this.loading = true;
    try {
      await agent.Books.create(book);
      runInAction(() => {
        this.bookRegistry.set(book.bookId, book);
        this.selectedBook = book;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateBook = async (book: Book) => {
    this.loading = true;
    try {
      await agent.Books.update(book);
      runInAction(() => {
        this.bookRegistry.set(book.bookId, book);
        this.selectedBook = book;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteBook = async (bookId: string) => {
    this.loading = true;
    try {
      await agent.Books.delete(bookId);
      runInAction(() => {
        this.bookRegistry.delete(bookId);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
