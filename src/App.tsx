import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import UseReactRouter from './routes/use_react_router';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

function App() {
  const element = UseReactRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <div>{element}</div>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
