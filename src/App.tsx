import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layouts';
import Home from './pages/Home';
import AuthCallBack from './pages/AuthCallBack';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './auth/ProtectedRoute';
import ManageRestaurant from './pages/ManageRestaurant';
import Search from './pages/Search';
import Detail from './pages/Detail';
import OrderStatus from './pages/OrderStatus';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <Home />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallBack />} />
      <Route
        path="/search/:city"
        element={
          <Layout>
            <Search />
          </Layout>
        }
      />
      <Route
        path="/detail/:restaurantId"
        element={
          <Layout>
            <Detail />
          </Layout>
        }
      />

      {/* 受保護的路由 */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfile />
            </Layout>
          }
        />
        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestaurant />
            </Layout>
          }
        />
        <Route
          path="/order-status"
          element={
            <Layout>
              <OrderStatus />
            </Layout>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
