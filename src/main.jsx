import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import ApolloClientProvider from './apollo/ApolloProvider.jsx';

createRoot(document.getElementById('root')).render(
  <ApolloClientProvider>
    <App />
  </ApolloClientProvider>,
)
