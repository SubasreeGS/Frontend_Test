import { Link } from "react-router"

function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4">
                <div className="container-fluid px-4">
                    <Link className="navbar-brand fw-bold text-primary" to="/dashboard">
                        Objects Dashboard
                    </Link>
                    
                    {/* Mobile Hamburger Toggle Button */}
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" 
                        aria-controls="navbarNav" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link px-3" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link px-3" to="/objects">Object List</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link px-3" to="/add-object">Add Object</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar