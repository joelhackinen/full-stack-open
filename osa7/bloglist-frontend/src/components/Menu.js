import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Menu = () => {
  const { name } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const style = {
    marginBottom: 20,
    marginTop: 10
  }
  const navBrandStyle = {
    fontSize: 30
  }

  return (
    <div style={style}>
      <Navbar collapseOnSelect expand="sm" bg="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Brand>
          <strong style={navBrandStyle}>Blogapp</strong>
        </Navbar.Brand>
        <Container>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link href="#" as="span">
                <Link to='/'><span className="align-middle">Blogs</span></Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to='/users'><span className="align-middle">Users</span></Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <span className="align-middle"><em>{name} logged in</em></span>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Button size="sm" variant="secondary" id="logout-button" onClick={() => dispatch(logout())}>
                  logout
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Menu