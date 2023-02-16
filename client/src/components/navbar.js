import { Container, Button, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const uid = window.localStorage.getItem("user_id");
  const isadmin = window.localStorage.getItem("is_admin");

  function handleLogout() {
    window.localStorage.clear();
    navigate("/");
  }

  return (
    <Navbar expand="lg" className="px-2">
      <Container fluid>
        <Navbar.Brand href="/" style={{ fontWeight: "700" }}>
          Infuse <img src="../images/bus.png" width={60} height={60} /> Travels
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          {isadmin == "true" && (
            <Button
              className="mx-2"
              variant="dark"
              onClick={() => navigate("/manage_users")}
            >
              USERS
            </Button>
          )}

          {isadmin == "true" && (
            <Button
              className="mx-2"
              variant="dark"
              onClick={() => navigate("/manage_buses")}
            >
              BUSES
            </Button>
          )}

          {uid ? (
            <>
              <Button
                variant="outline-0"
                onClick={() => navigate("/user_profile")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
              </Button>
              <Button
                className="mx-2"
                variant="outline-0"
                onClick={() => handleLogout()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-box-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg>
              </Button>
            </>
          ) : (
            <Button variant="dark" onClick={() => navigate("/login")}>
              LOG IN
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
