import {Container } from "react-bootstrap";
function Home_page(props) {
    return (
        <Container>
            <div>
                welcome {props.emailid}
            </div>
        </Container>
     );
}

export default Home_page;


