import React from 'react'
import { Link, Outlet} from 'react-router'

const Layout = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/home">Todo</Link>
      </nav>
      <Outlet/>
    </div>
  )
}

export default Layout