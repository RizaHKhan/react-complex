import React from 'react'
import { Link } from 'react-router-dom'

function Footer () {
  return (
    <footer class="border-top text-center small text-muted py-3">
      <p><Link to="/" class="mx-1">Home</Link> | <Link class="mx-1" to="/about-us">About Us</Link> | <Link class="mx-1" to="/terms">Terms</Link></p>
      <p class="m-0">Copyright &copy; 2020 <a to="/" class="text-muted">ComplexApp</a>. All rights reserved.</p>
    </footer>
  )
}

export default Footer