import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Sale } from "../models/sale";

export default class SaleStore {
  saleRegistry = new Map<string, Sale>();
  selectedSale: Sale | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get salesById() {
    return Array.from(this.saleRegistry.values()).sort(
      (a, b) => parseInt(a.saleId) - parseInt(b.saleId)
    );
  }

  get saleOptions() {
    return Array.from(this.saleRegistry.values())
  }
  loadSales = async () => {
    this.loadingInitial = true;
    try {
      const sales = await agent.Sales.list();
      sales.forEach((sale) => {
        this.setSale(sale);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };
  

  loadSale = async (saleId: string) => {
    let sale = this.getSale(saleId);
    if (sale) {
      this.selectedSale = sale;
    } else {
      this.loadingInitial = true;
      try {
        sale = await agent.Sales.details(saleId);
        this.setSale(sale);
        runInAction(() => {
          this.selectedSale = sale;
        })
        this.setLoadingInitial(false);
        return sale;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setSale = (sale: Sale) => {
    this.saleRegistry.set(sale.saleId, sale);
  };

  private getSale = (saleId: string) => {
    return this.saleRegistry.get(saleId);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createSale = async (sale: Sale) => {
    this.loading = true;
    try {
      await agent.Sales.create(sale);
      runInAction(() => {
        this.saleRegistry.set(sale.saleId, sale);
        this.selectedSale = sale;
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

  updateSale = async (sale: Sale) => {
    this.loading = true;
    try {
      await agent.Sales.update(sale);
      runInAction(() => {
        this.saleRegistry.set(sale.saleId, sale);
        this.selectedSale = sale;
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

  deleteSale = async (saleId: string) => {
    this.loading = true;
    try {
      await agent.Sales.delete(saleId);
      runInAction(() => {
        this.saleRegistry.delete(saleId);
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
