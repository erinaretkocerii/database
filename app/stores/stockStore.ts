import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Stock } from "../models/stock";

export default class StockStore {
  stockRegistry = new Map<string, Stock>();
  selectedStock: Stock | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get stocksById() {
    return Array.from(this.stockRegistry.values()).sort(
      (a, b) => parseInt(a.stockId) - parseInt(b.stockId)
    );
  }
  loadStocks = async () => {
    this.loadingInitial = true;
    try {
      const stocks = await agent.Stocks.list();
      stocks.forEach((stock) => {
        this.setStock(stock);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };
  

  loadStock = async (stockId: string) => {
    let stock = this.getStock(stockId);
    if (stock) {
      this.selectedStock = stock;
    } else {
      this.loadingInitial = true;
      try {
        stock = await agent.Stocks.details(stockId);
        this.setStock(stock);
        runInAction(() => {
          this.selectedStock = stock;
        })
        this.setLoadingInitial(false);
        return stock;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setStock = (stock: Stock) => {
    this.stockRegistry.set(stock.stockId, stock);
  };

  private getStock = (stockId: string) => {
    return this.stockRegistry.get(stockId);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createStock = async (stock: Stock) => {
    this.loading = true;
    try {
      await agent.Stocks.create(stock);
      runInAction(() => {
        this.stockRegistry.set(stock.stockId, stock);
        this.selectedStock = stock;
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

  updateStock = async (stock: Stock) => {
    this.loading = true;
    try {
      await agent.Stocks.update(stock);
      runInAction(() => {
        this.stockRegistry.set(stock.stockId, stock);
        this.selectedStock = stock;
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

  deleteStock = async (stockId: string) => {
    this.loading = true;
    try {
      await agent.Stocks.delete(stockId);
      runInAction(() => {
        this.stockRegistry.delete(stockId);
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
