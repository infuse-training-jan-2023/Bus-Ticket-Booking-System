// import {Container, Button, Navbar} from 'react-bootstrap'
// import { useEffect,useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// // function checkAdmin(){
// //   if(window.localStorage.getItem("is_admin") =="false"){

// //   }
// //   else{
// //     return true
// //   }
// // }



// function handleLogout(){
//   console.log("in logout")
//   window.localStorage.clear()
// }





// export default function NavBar() {

//   const [isadmin,setadmin]=useState(['false']);
//   const [isloggedIn,setLog]=useState([]);
//   useEffect(() => {
//     checkLogin();
    
//     window.addEventListener('storage', checkLogin())
//     return () => window.removeEventListener('storage', checkLogin())
//   }, [isloggedIn])



//   console.log(isloggedIn)

//   function checkLogin(){
//     console.log("user_id")
//     console.log(window.localStorage.getItem("user_id"))
//     if(window.localStorage.getItem("user_id") ==null){
//       console.log("if")
//       setLog('false')
  
//     }
//     else{
//       console.log("else")
//       setLog('true')
//     }
//   }

//   console.log(isloggedIn)
//   return (
//     <Navbar bg="light" expand="lg">
//       <Container fluid>
//         <Navbar.Brand href="#">Infuse Bus Travels</Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll" className="justify-content-end">
//             {isloggedIn? <Button variant="outline-success"  onClick={()=>handleLogout()}>LOG IN</Button>:<Button variant="outline-success">LOG OUT</Button>}
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }







import { Container, Button, Navbar } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function NavBar() {
  const navigate = useNavigate();
  const uid = window.localStorage.getItem("user_id")
  const isadmin = window.localStorage.getItem('is_admin')

  console.log(isadmin)

  function handleLogout() {
    console.log("in logout");
    window.localStorage.clear();
    navigate('/')
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Infuse Bus Travels</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          {isadmin=='true' && 
             <Button variant="outline-success" onClick={()=>navigate('/users')}>
             USERS
           </Button>
          }
  
          {isadmin=='true' &&
             <Button variant="outline-success" onClick={() => navigate('/buses')}>
             BUSES
           </Button>
          }

          {uid ? (
            <Button variant="outline-success" onClick={() => handleLogout()}>
              LOG OUT
            </Button>
          ) : (
            <Button
              variant="outline-success"
              onClick={() => navigate("/login")}
            >
              LOG IN
            </Button>
          )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}