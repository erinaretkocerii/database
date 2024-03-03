import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Order } from "../models/order";

export default class OrderStore {
  orderRegistry = new Map<string, Order>();
  selectedOrder: Order | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get ordersById() {
    return Array.from(this.orderRegistry.values()).sort(
      (a, b) => parseInt(a.orderId) - parseInt(b.orderId)
    );
  }
  loadOrders = async () => {
    this.loadingInitial = true;
    try {
      const stores = await agent.Orders.list();
      stores.forEach((order) => {
        this.setOrder(order);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadOrder = async (orderId: string) => {
    let order = this.getOrder(orderId);
    if (order) {
      this.selectedOrder = order;
    } else {
      this.loadingInitial = true;
      try {
        order = await agent.Orders.details(orderId);
        this.setOrder(order);
        runInAction(() => {
          this.selectedOrder = order;
        })
        this.setLoadingInitial(false);
        return order;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setOrder = (order: Order) => {
    this.orderRegistry.set(order.orderId, order);
  };

  private getOrder = (orderId: string) => {
    return this.orderRegistry.get(orderId);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createOrder = async (order: Order) => {
    this.loading = true;
    try {
      await agent.Orders.create(order);
      runInAction(() => {
        this.orderRegistry.set(order.orderId, order);
        this.selectedOrder = order;
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

  updateOrder = async (order: Order) => {
    this.loading = true;
    try {
      await agent.Orders.update(order);
      runInAction(() => {
        this.orderRegistry.set(order.orderId, order);
        this.selectedOrder = order;
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

  deleteOrder = async (orderId: string) => {
    this.loading = true;
    try {
      await agent.Orders.delete(orderId);
      runInAction(() => {
        this.orderRegistry.delete(orderId);
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
