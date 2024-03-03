import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { AudioBook } from "../models/audioBook";

export default class AudioBookStore {
  audioBookRegistry = new Map<string, AudioBook>();
  selectedAudioBook: AudioBook | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get audioBooksById() {
    return Array.from(this.audioBookRegistry.values()).sort(
      (a, b) => parseInt(a.audioBookId) - parseInt(b.audioBookId)
    );
  }

  get audioBookOptions() {
    return Array.from(this.audioBookRegistry.values())
  }
  loadAudioBooks = async () => {
    this.loadingInitial = true;
    try {
      const audioBooks = await agent.AudioBooks.list();
      audioBooks.forEach((audioBook) => {
        this.setAudioBook(audioBook);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };
  

  loadAudioBook = async (audioBookId: string) => {
    let audioBook = this.getAudioBook(audioBookId);
    if (audioBook) {
      this.selectedAudioBook = audioBook;
    } else {
      this.loadingInitial = true;
      try {
        audioBook = await agent.AudioBooks.details(audioBookId);
        this.setAudioBook(audioBook);
        runInAction(() => {
          this.selectedAudioBook = audioBook;
        })
        this.setLoadingInitial(false);
        return audioBook;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setAudioBook = (audioBook: AudioBook) => {
    this.audioBookRegistry.set(audioBook.audioBookId, audioBook);
  };

  private getAudioBook = (audioBookId: string) => {
    return this.audioBookRegistry.get(audioBookId);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createAudioBook = async (audioBook: AudioBook) => {
    this.loading = true;
    try {
      await agent.AudioBooks.create(audioBook);
      runInAction(() => {
        this.audioBookRegistry.set(audioBook.audioBookId, audioBook);
        this.selectedAudioBook = audioBook;
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

  updateAudioBook = async (audioBook: AudioBook) => {
    this.loading = true;
    try {
      await agent.AudioBooks.update(audioBook);
      runInAction(() => {
        this.audioBookRegistry.set(audioBook.audioBookId, audioBook);
        this.selectedAudioBook = audioBook;
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

  deleteAudioBook = async (audioBookId: string) => {
    this.loading = true;
    try {
      await agent.AudioBooks.delete(audioBookId);
      runInAction(() => {
        this.audioBookRegistry.delete(audioBookId);
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
