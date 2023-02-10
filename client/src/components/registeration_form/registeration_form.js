import './registration_form.css'

var user = {'emailid':'','gender':'','password':'','is_admin':false}

function get_email(e){
    user['emailid'] = e.target.value
    console.log(user['emailid'])
}
function get_password(e){
    user['password'] = e.target.value
    console.log(user['password'])
}
function get_gender(e){
    user['gender'] = e.target.value
    console.log(user['gender'])
}


function Registration_form(props) {
    return (
        <div className="container">
        <div className="screen">
            <div className="screen__content">
                <form className="register">
                    <div className="registration_field">
                        <i className="register__icon fas fa-user"></i>
                        <input type="email" className="registeration_input" placeholder="User name / Email" onChange={get_email}/>
                    </div>
                    <div className="registration_field">
                        <h3>Gender</h3>
                        <input type="radio" id="html" name="gender" value="Male" onClick={get_gender}/>
                        <label htmlFor="html">Male</label><br/>
                        <input type="radio" id="css" name="gender" value="Female" onClick={get_gender}/>
                        <label htmlFor="css">Female</label><br/>
                    </div>
                    <div className="registration_field">
                        <i className="register__icon fas fa-lock"></i>
                        <input type="password" className="registeration_input" placeholder="Password" onChange={get_password}/>
                    </div>
                    <div className="registration_field">
                        <i className="register__icon fas fa-lock"></i>
                        <input type="password" className="registeration_input" placeholder="confirm password" onChange={get_password}/>
                    </div>
                    <button className="button register__submit" onClick={e=>{e.preventDefault();props.on_submit(user)}}>
                        <span className="button__text">Register</span>
                        <i className="button__icon fas fa-chevron-right"></i>
                    </button>
                </form>

            </div>
            <div className="screen__background">
                <span className="screen__background__shape screen__background__shape1"></span>
            </div>
        </div>
    </div>
     );
}

export default Registration_form;
