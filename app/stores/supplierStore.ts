import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Supplier } from "../models/supplier";

export default class SupplierStore {
  supplierRegistry = new Map<string, Supplier>();
  selectedSupplier: Supplier | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get suppliersById() {
    return Array.from(this.supplierRegistry.values()).sort(
      (a, b) => parseInt(a.supplierId) - parseInt(b.supplierId)
    );
  }

  loadSuppliers = async () => {
    this.loadingInitial = true;
    try {
      const suppliers = await agent.Suppliers.list();
      suppliers.forEach((supplier) => {
        this.setSupplier(supplier);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadSupplier = async (supplierId: string) => {
    let supplier = this.getSupplier(supplierId);
    if (supplier) {
      this.selectedSupplier = supplier;
    } else {
      this.loadingInitial = true;
      try {
        supplier = await agent.Suppliers.details(supplierId);
        this.setSupplier(supplier);
        runInAction(() => {
          this.selectedSupplier = supplier;
        })
        this.setLoadingInitial(false);
        return supplier;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setSupplier = (supplier: Supplier) => {
    this.supplierRegistry.set(supplier.supplierId, supplier);
  };

  private getSupplier = (supplierId: string) => {
    return this.supplierRegistry.get(supplierId);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createSupplier = async (supplier: Supplier) => {
    this.loading = true;
    try {
      await agent.Suppliers.create(supplier);
      runInAction(() => {
        this.supplierRegistry.set(supplier.supplierId, supplier);
        this.selectedSupplier = supplier;
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

  updateSupplier = async (supplier: Supplier) => {
    this.loading = true;
    try {
      await agent.Suppliers.update(supplier);
      runInAction(() => {
        this.supplierRegistry.set(supplier.supplierId, supplier);
        this.selectedSupplier = supplier;
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

  deleteSupplier = async (supplierId: string) => {
    this.loading = true;
    try {
      await agent.Suppliers.delete(supplierId);
      runInAction(() => {
        this.supplierRegistry.delete(supplierId);
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
