import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// eslint-disable-next-line import/order
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Product from './page/Product.tsx'
import AddProduct from './page/AddProduct.tsx'
// eslint-disable-next-line import/order
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Read from './page/Read.tsx'
import Update from './page/Update.tsx'

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/dashboard/product',
        element: <Product />
      },
      {
        path: '/dashboard/product/add',
        element: <AddProduct />
      },
      {
        path: '/dashboard/product/read/:id',
        element: <Read />
      },
      {
        path: '/dashboard/product/update/:id',
        element: <Update />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
