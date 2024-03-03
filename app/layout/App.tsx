import React from "react";
import { Container } from "semantic-ui-react";
import CategoryDashboard from "../../features/dashboard/categories/CategoryDashboard";
import { observer } from "mobx-react-lite";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import CategoryForm from "../../features/dashboard/categories/form/CategoryForm";
import CategoryDetails from "../../features/dashboard/categories/CategoryDetails";
import Dashboard from "../../features/dashboard/Dashboard";
import StoreDashboard from "../../features/dashboard/stores/StoreDashboard";
import StoreDetails from "../../features/dashboard/stores/StoreDetails";
import StoreForm from "../../features/dashboard/stores/form/StoreForm";
import BookDetails from "../../features/dashboard/books/BookDetails";
import BookDashboard from "../../features/dashboard/books/BookDashboard";
import BookForm from "../../features/dashboard/books/form/BookForm";
import SupplierForm from "../../features/dashboard/suppliers/form/SupplierForm";
import SupplierDetails from "../../features/dashboard/suppliers/SupplierDetails";
import SupplierDashboard from "../../features/dashboard/suppliers/SupplierDashboard";
import LoginForm from "../../features/users/LoginForm";
import OrderDashboard from "../../features/dashboard/orders/OrderDashboard";
import OrderDetails from "../../features/dashboard/orders/OrderDetails";
import OrderForm from "../../features/dashboard/orders/form/OrderForm";
import StockForm from "../../features/dashboard/stock/form/StockForm";
import StockDashboard from "../../features/dashboard/stock/StockDashboard";
import StockDetails from "../../features/dashboard/stock/StockDetails";
import UserDashboard from "../../features/dashboard/users/UserDashboard";
import UserDetails from "../../features/dashboard/users/UserDetails";
import UserForm from "../../features/dashboard/users/form/UserForm";
import RoleDashboard from "../../features/dashboard/roles/RoleDashboard";
import RoleDetails from "../../features/dashboard/roles/RoleDetails";
import RoleForm from "../../features/dashboard/roles/form/RoleForm";
import RegisterForm from "../../features/users/RegisterForm";
import AccountPage from "../../features/account/AccountPage";
import ReviewDashboard from "../../features/dashboard/reviews/ReviewDashboard";
import ReviewDetails from "../../features/dashboard/reviews/ReviewDetails";
import ReviewForm from "../../features/dashboard/reviews/form/ReviewForm";
import AudioBookDashboard from "../../features/dashboard/audiobooks/AudioBookDashboard";
import AudioBookDetails from "../../features/dashboard/audiobooks/AudioBookDetails";
import AudioBookForm from "../../features/dashboard/audiobooks/form/AudioBookForm";
import NovelForm from "../../features/dashboard/novels/form/NovelForm";
import NovelDashboard from "../../features/dashboard/novels/NovelDashboard";
import NovelDetails from "../../features/dashboard/novels/NovelDetails";
import BlogDashboard from "../../features/dashboard/blogs/BlogDashboard";
import BlogDetails from "../../features/dashboard/blogs/BlogDetails";
import BlogForm from "../../features/dashboard/blogs/form/BlogForm";
import ReportForm from "../../features/dashboard/reports/form/ReportForm";
import ReportDashboard from "../../features/dashboard/reports/ReportDashboard";
import ReportDetails from "../../features/dashboard/reports/ReportDetails";
import SaleForm from "../../features/dashboard/sales/form/SaleForm";
import SaleDashboard from "../../features/dashboard/sales/SaleDashboard";
import SaleDetails from "../../features/dashboard/sales/SaleDetails";
import StaffForm from "../../features/dashboard/staffs/form/StaffForm";
import StaffDashboard from "../../features/dashboard/staffs/StaffDashboard";
import StaffDetails from "../../features/dashboard/staffs/StaffDetails";
import AccountForm from "../../features/account/AccountForm";

function App() {
  const location = useLocation();
  return (
    <>
      <Container style={{ marginTop: "6em" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path={`/update-account/${localStorage.getItem("userId")}`} element={<AccountForm />} />
          <Route path="/dashboard/categories" element={<CategoryDashboard />} />
          <Route
            path="/dashboard/categories/:categoryId"
            element={<CategoryDetails />}
          />
          <Route
            key={location.key}
            path="/dashboard/categories/createCategory"
            element={<CategoryForm />}
          />
          <Route
            key={location.key}
            path="/dashboard/manage/category/:categoryId"
            element={<CategoryForm />}
          />

          <Route path="/dashboard/stores" element={<StoreDashboard />} />
          <Route path="/dashboard/stores/:storeId" element={<StoreDetails />} />
          <Route
            key={location.key}
            path="/dashboard/stores/createStore"
            element={<StoreForm />}
          />
          <Route
            key={location.key}
            path="/dashboard/manage/store/:storeId"
            element={<StoreForm />}
          />

          <Route path="/dashboard/books" element={<BookDashboard />} />
          <Route path="/dashboard/books/:bookId" element={<BookDetails />} />
          <Route
            key={location.key}
            path="/dashboard/books/createBook"
            element={<BookForm />}
          />
          <Route
            key={location.key}
            path="/dashboard/manage/book/:bookId"
            element={<BookForm />}
          />

          <Route path="/dashboard/suppliers" element={<SupplierDashboard />} />
          <Route
            path="/dashboard/suppliers/:supplierId"
            element={<SupplierDetails />}
          />
          <Route
            key={location.key}
            path="/dashboard/suppliers/createSupplier"
            element={<SupplierForm />}
          />
          <Route
            key={location.key}
            path="/dashboard/manage/supplier/:supplierId"
            element={<SupplierForm />}
          />

          <Route path="/dashboard/orders" element={<OrderDashboard />} />
          <Route path="/dashboard/orders/:orderId" element={<OrderDetails />} />
          <Route
            key={location.key}
            path="/dashboard/orders/createOrder"
            element={<OrderForm />}
          />
          <Route
            key={location.key}
            path="/dashboard/manage/orders/:orderId"
            element={<OrderForm />}
          />

          <Route path="/dashboard/stocks" element={<StockDashboard />} />
          <Route path="/dashboard/stocks/:stockId" element={<StockDetails />} />
          <Route
            key={location.key}
            path="/dashboard/stocks/createStock"
            element={<StockForm />}
          />
          <Route
            key={location.key}
            path="/dashboard/manage/stocks/:stockId"
            element={<StockForm />}
          />

          <Route path="/dashboard/users" element={<UserDashboard />} />
          <Route path="/dashboard/users/:userId" element={<UserDetails />} />
          <Route
            key={location.key}
            path="/dashboard/users/createUser"
            element={<UserForm />}
          />
          <Route
            key={location.key}
            path="/dashboard/manage/users/:userId"
            element={<UserForm />}
          />

          <Route path="/dashboard/roles" element={<RoleDashboard />} />
          <Route path="/dashboard/roles/:roleId" element={<RoleDetails />} />
          <Route
            key={location.key}
            path="/dashboard/roles/createRole"
            element={<RoleForm />}
          />
          <Route
            key={location.key}
            path="/dashboard/manage/roles/:roleId"
            element={<RoleForm />}
          />

          <Route path="/dashboard/reviews" element={<ReviewDashboard />} />
          <Route
            path="/dashboard/reviews/:reviewId"
            element={<ReviewDetails />}
          />
          <Route
            key={location.key}
            path="/dashboard/reviews/createReview"
            element={<ReviewForm />}
          />
          <Route
            key={location.key}
            path="/dashboard/manage/reviews/:reviewId"
            element={<ReviewForm />}
          />

          <Route path="/dashboard/audioBooks" element={<AudioBookDashboard />} />
          <Route
            path="/dashboard/audioBooks/:audioBookId"
            element={<AudioBookDetails />}
          />
          <Route
            key={location.key}
            path="/dashboard/audioBooks/createAudioBook"
            element={<AudioBookForm />}
          />
          <Route
            key={location.key}
            path="/dashboard/manage/audioBooks/:audioBookId"
            element={<AudioBookForm />}
          />

          <Route path="/dashboard/novels" element={<NovelDashboard />} />
          <Route
            path="/dashboard/novels/:novelId"
            element={<NovelDetails />}
          />
          <Route
            key={location.key}
            path="/dashboard/novels/createNovel"
            element={<NovelForm />}
          />
          <Route
            key={location.key}
            path="/dashboard/manage/novels/:novelId"
            element={<NovelForm />}
          />

          <Route path="/dashboard/blogs" element={<BlogDashboard />} />
          <Route
            path="/dashboard/blogs/:blogId"
            element={<BlogDetails />}
          />
          <Route
            key={location.key}
            path="/dashboard/blogs/createBlog"
            element={<BlogForm />}
          />
          <Route
            key={location.key}
            path="/dashboard/manage/blogs/:blogId"
            element={<BlogForm />}
          />

          <Route path="/dashboard/staffs" element={<StaffDashboard />} />
          <Route
            path="/dashboard/staffs/:staffId"
            element={<StaffDetails />}
          />
          <Route
            key={location.key}
            path="/dashboard/staffs/createStaff"
            element={<StaffForm />}
          />
          <Route
            key={location.key}
            path="/dashboard/manage/staffs/:staffId"
            element={<StaffForm />}
          />

          <Route path="/dashboard/sales" element={<SaleDashboard />} />
          <Route
            path="/dashboard/sales/:saleId"
            element={<SaleDetails />}
          />
          <Route
            key={location.key}
            path="/dashboard/sales/createSale"
            element={<SaleForm />}
          />
          <Route
            key={location.key}
            path="/dashboard/manage/sales/:saleId"
            element={<SaleForm />}
          />

          <Route path="/dashboard/reports" element={<ReportDashboard />} />
          <Route
            path="/dashboard/reports/:reportId"
            element={<ReportDetails />}
          />
          <Route
            key={location.key}
            path="/dashboard/reports/createReport"
            element={<ReportForm />}
          />
          <Route
            key={location.key}
            path="/dashboard/manage/reports/:reportId"
            element={<ReportForm />}
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Container>
    </>
  );
}

export default observer(App);
