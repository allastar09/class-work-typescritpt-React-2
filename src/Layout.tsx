import React from 'react'
import { Link, Outlet } from 'react-router'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b border-gray-200 bg-white px-6 py-5">
        <div className="flex items-center justify-center gap-10">
          <Link
            to="/"
            className="text-base font-semibold tracking-wide text-gray-700 transition hover:text-indigo-600"
          >
            Home
          </Link>

          <Link
            to="/home"
            className="text-base font-semibold tracking-wide text-gray-700 transition hover:text-indigo-600"
          >
            Todo
          </Link>
          <Link
            to="/info"
            className="text-base font-semibold tracking-wide text-gray-700 transition hover:text-indigo-600"
          >
            Info
          </Link>
        </div>
      </nav>

      <Outlet />
    </div>
  )
}

export default Layout