import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Store } from "../models/store";

export default class StoreStore {
  storeRegistry = new Map<string, Store>();
  selectedStore: Store | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get storesById() {
    return Array.from(this.storeRegistry.values()).sort(
      (a, b) => parseInt(a.storeId) - parseInt(b.storeId)
    );
  }
  loadStores = async () => {
    this.loadingInitial = true;
    try {
      const stores = await agent.Stores.list();
      stores.forEach((store) => {
        this.setStore(store);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadStore = async (storeId: string) => {
    let store = this.getStore(storeId);
    if (store) {
      this.selectedStore = store;
    } else {
      this.loadingInitial = true;
      try {
        store = await agent.Stores.details(storeId);
        this.setStore(store);
        runInAction(() => {
          this.selectedStore = store;
        })
        this.setLoadingInitial(false);
        return store;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setStore = (store: Store) => {
    this.storeRegistry.set(store.storeId, store);
  };

  private getStore = (storeId: string) => {
    return this.storeRegistry.get(storeId);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createStore = async (store: Store) => {
    this.loading = true;
    try {
      await agent.Stores.create(store);
      runInAction(() => {
        this.storeRegistry.set(store.storeId, store);
        this.selectedStore = store;
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

  updateStore = async (store: Store) => {
    this.loading = true;
    try {
      await agent.Stores.update(store);
      runInAction(() => {
        this.storeRegistry.set(store.storeId, store);
        this.selectedStore = store;
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

  deleteStore = async (storeId: string) => {
    this.loading = true;
    try {
      await agent.Stores.delete(storeId);
      runInAction(() => {
        this.storeRegistry.delete(storeId);
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
