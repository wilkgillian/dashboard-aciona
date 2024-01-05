import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import theme from '@/styles/theme';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from '@/contexts/UserContext';
import { DashboardProvider } from '@/contexts/DashboardContext';
import { FiltersProvider } from '@/contexts/FiltersContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AuthProvider>
        <UserProvider>
          <FiltersProvider>
            <DashboardProvider>
              <Component {...pageProps} />
            </DashboardProvider>
          </FiltersProvider>
        </UserProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
