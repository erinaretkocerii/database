import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Novel } from "../models/novel";

export default class NovelStore {
  novelRegistry = new Map<string, Novel>();
  selectedNovel: Novel | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get novelsById() {
    return Array.from(this.novelRegistry.values()).sort(
      (a, b) => parseInt(a.novelId) - parseInt(b.novelId)
    );
  }

  get novelOptions() {
    return Array.from(this.novelRegistry.values())
  }
  loadNovels = async () => {
    this.loadingInitial = true;
    try {
      const novels = await agent.Novels.list();
      novels.forEach((novel) => {
        this.setNovel(novel);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };
  

  loadNovel = async (novelId: string) => {
    let novel = this.getNovel(novelId);
    if (novel) {
      this.selectedNovel = novel;
    } else {
      this.loadingInitial = true;
      try {
        novel = await agent.Novels.details(novelId);
        this.setNovel(novel);
        runInAction(() => {
          this.selectedNovel = novel;
        })
        this.setLoadingInitial(false);
        return novel;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setNovel = (novel: Novel) => {
    this.novelRegistry.set(novel.novelId, novel);
  };

  private getNovel = (novelId: string) => {
    return this.novelRegistry.get(novelId);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createNovel = async (novel: Novel) => {
    this.loading = true;
    try {
      await agent.Novels.create(novel);
      runInAction(() => {
        this.novelRegistry.set(novel.novelId, novel);
        this.selectedNovel = novel;
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

  updateNovel = async (novel: Novel) => {
    this.loading = true;
    try {
      await agent.Novels.update(novel);
      runInAction(() => {
        this.novelRegistry.set(novel.novelId, novel);
        this.selectedNovel = novel;
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

  deleteNovel = async (novelId: string) => {
    this.loading = true;
    try {
      await agent.Novels.delete(novelId);
      runInAction(() => {
        this.novelRegistry.delete(novelId);
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
