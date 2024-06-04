import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layouts';
import Home from './pages/Home';
import AuthCallBack from './pages/AuthCallBack';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './auth/ProtectedRoute';

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

      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfile />
            </Layout>
          }
        />
      </Route>

      <Route path="/auth-callback" element={<AuthCallBack />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
