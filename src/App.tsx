import React from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from './Layout.tsx'

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
          path: "/about",
          element: 'it is about'
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