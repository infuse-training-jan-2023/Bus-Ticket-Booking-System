
import { useNavigate } from 'react-router-dom';
function Button() {
    const navigate = useNavigate();
    const register = () => navigate('/register');
    return (
        <button onClick={register}>
            register
        </button>
     );
}

export default Button;
