import { Link } from 'react-router-dom'

const Header = () => {

  return (
    <header>
      <nav>
        <Link to ='/' >Collections</Link>
        <Link to='/share' >Share Your Art</Link>
      </nav>
    </header>
  )
}

export default Header