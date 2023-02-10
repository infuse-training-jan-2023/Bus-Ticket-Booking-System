import './login_form.css'

var email = ''
var password = ''


function get_email(e){
    email = e.target.value
}
function get_password(e){
    password = e.target.value
}

function prevent_default(e){
    e.preventDefault()
}
function Login_form(props) {
    return (
        <div className="container">
        <div className="screen">
            <div className="screen__content">
                <form className="login" onSubmit={prevent_default}>
                    <div className="login__field">
                        <i className="login__icon fas fa-user"></i>
                        <input type="text" className="login__input" placeholder="User name / Email" onChange={get_email}/>
                    </div>
                    <div className="login__field">
                        <i className="login__icon fas fa-lock"></i>
                        <input type="password" className="login__input" placeholder="Password" onChange={get_password}/>
                    </div>
                    <button className="button login__submit" onClick={(e)=>{e.preventDefault();props.on_submit(email,password)}}>
                        <span className="button__text">Log In Now</span>
                        <i className="button__icon fas fa-chevron-right"></i>
                    </button>
                </form>
                    <button className="sign_up">sign up</button>
            </div>
            <div className="screen__background">
                <span className="screen__background__shape screen__background__shape1"></span>
            </div>
        </div>
    </div>
     );
}

export default Login_form;
