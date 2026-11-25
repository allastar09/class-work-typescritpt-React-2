import React from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from './Layout.tsx'
import Home from './pages/Home.tsx';
import Info from './pages/Info.tsx';

const App = () => {

  const router = createBrowserRouter([
    { 
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: 'Home'
        },
        {
          path: "/home",
          element: <Home />
        },
        {
          path: '/info',
          element: <Info />
        }
      ]
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App