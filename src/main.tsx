import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './global.css';
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Auth0ProviderWithNavigate>
        <App />
        <Toaster visibleToasts={1} position="top-right" richColors />
      </Auth0ProviderWithNavigate>
    </QueryClientProvider>
  </BrowserRouter>
);
