import { Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { useRecoilState, 
    useRecoilValue, 
    useSetRecoilState, 
    useResetRecoilState 
  } from 'recoil';
  import userAtom from '../common/userAtom';


function TopMenu() {

    const [userInfo, setUserInfo] = useRecoilState(userAtom); 

    const currentUserInfo = useRecoilValue(userAtom); 

    function logout() {
        console.log("bye user!");
        //alert(111);
        setUserInfo( undefined);   
      };



    
    return <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">홈</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0"  style={{ maxHeight: '100px' }}  navbarScroll>
            {/* <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>              
            </NavDropdown> */}
            
          </Nav>    
          <Form >
            <Button variant="outline-success" onClick={(event) => logout()} >로그아웃</Button>
          </Form>      
        </Navbar.Collapse>
      </Container>
    </Navbar>
}


export default TopMenu;