import './registration_form.css'


function Registration_form() {
    return (
        <div className="container">
        <div className="screen">
            <div className="screen__content">
                <form className="register">
                    <div className="registration_field">
                        <i className="register__icon fas fa-user"></i>
                        <input type="email" className="registeration_input" placeholder="User name / Email"/>
                    </div>
                    <div className="registration_field">
                        <i className="register__icon fas fa-lock"></i>
                        <input type="gender" className="registeration_input" placeholder="gender"/>
                    </div>
                    <div className="registration_field">
                        <i className="register__icon fas fa-lock"></i>
                        <input type="password" className="registeration_input" placeholder="Password"/>
                    </div>
                    <div className="registration_field">
                        <i className="register__icon fas fa-lock"></i>
                        <input type="password" className="registeration_input" placeholder="confirm password"/>
                    </div>
                    <button className="button register__submit">
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

export default Registration_form;
