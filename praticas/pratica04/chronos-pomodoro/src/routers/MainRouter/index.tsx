// src/routers/MainRouter/index.tsx
import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import { useEffect } from 'react';

import { AuthContextProvider } from '../../contexts/AuthContext';
import { ProtecterRoute } from '../../components/ProtectedRoute';
import { PublicOnlyRoute } from '../../components/PublicOnlyRoute';

import { Login } from '../../pages/Login';
import { Home } from '../../pages/Home';
import { History } from '../../pages/History';
import { Settings } from '../../pages/Settings';
import { AboutPomodoro } from '../../pages/AboutPomodoro';
import { NotFound } from '../../pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

export function MainRouter() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          {/* Rota pública — redireciona para /home se já logado */}
          <Route
            path="/"
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />

          {/* Rotas protegidas */}
          <Route
            path="/home"
            element={
              <ProtecterRoute>
                <Home />
              </ProtecterRoute>
            }
          />
          <Route
            path="/history/"
            element={
              <ProtecterRoute>
                <History />
              </ProtecterRoute>
            }
          />
          <Route
            path="/settings/"
            element={
              <ProtecterRoute>
                <Settings />
              </ProtecterRoute>
            }
          />
          <Route
            path="/about-pomodoro/"
            element={
              <ProtecterRoute>
                <AboutPomodoro />
              </ProtecterRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollToTop />
      </AuthContextProvider>
    </BrowserRouter>
  );
}