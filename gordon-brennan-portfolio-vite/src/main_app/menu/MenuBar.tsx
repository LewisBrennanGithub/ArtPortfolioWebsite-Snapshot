import { Link } from 'react-router-dom';

const MenuBar = () => {
    return (
        <div className="topMenu">
            <nav>
                <Link to="/collections-new" className="topMenuOther"><span>Art</span></Link>
                <Link to="/" className="topMenuHome"><span>Home</span></Link>
                <Link to="/about" className="topMenuOther"><span>About</span></Link>
            </nav>
        </div>
    );
}

export default MenuBar;