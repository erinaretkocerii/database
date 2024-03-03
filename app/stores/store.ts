import { createContext, useContext } from "react";
import BookStore from "./bookStore";
import CategoryStore from "./categoryStore";
import CommonStore from "./commonStore";
import OrderStore from "./orderStore";
import StoreStore from "./storeStore";
import SupplierStore from "./supplierStore";
import StockStore from "./stockStore";
import UsersStore from "./usersStore";
import RoleStore from "./roleStore";
import ReviewStore from "./reviewStore";
import AudioBookStore from "./audioBookStore";
import BlogStore from "./blogStore";
import SaleStore from "./saleStore";
import StaffStore from "./staffStore";
import NovelStore from "./novelStore";
import ReportStore from "./reportStore";

interface Store {
    categoryStore : CategoryStore,
    storeStore : StoreStore,
    bookStore : BookStore,
    supplierStore: SupplierStore,
    commonStore: CommonStore,
    orderStore : OrderStore,
    stockStore : StockStore,
    usersStore: UsersStore,
    roleStore : RoleStore,
    reviewStore : ReviewStore,
    audioBookStore: AudioBookStore,
    blogStore: BlogStore,
    saleStore: SaleStore,
    staffStore: StaffStore,
    novelStore: NovelStore,
    reportStore: ReportStore


}

export const store: Store = {
    categoryStore: new CategoryStore(),
    storeStore: new StoreStore(),
    bookStore: new BookStore(),
    supplierStore: new SupplierStore(),
    commonStore: new CommonStore(),
    orderStore: new OrderStore(),
    stockStore: new StockStore(),
    usersStore: new UsersStore(),
    roleStore: new RoleStore(),
    reviewStore: new ReviewStore(),
    audioBookStore: new AudioBookStore(),
    blogStore: new BlogStore(),
    saleStore: new SaleStore(),
    staffStore: new StaffStore(),
    novelStore: new NovelStore(),
    reportStore: new ReportStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}