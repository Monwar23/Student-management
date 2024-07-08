import { NavLink } from "react-router-dom";
import UseAuth from "../hook/UseAuth";

const Navbar = () => {
    const { user, logOut } = UseAuth();

    const handleLogout = () => {
        logOut();
    };

    return (
        <div className="flex justify-around items-center bg-gray-800 p-4">
            {!user ? (
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        isActive ? "text-white no-underline p-2 rounded bg-blue-500" : "text-white no-underline p-2 rounded hover:bg-gray-700 transition duration-300"
                    }
                >
                    Login
                </NavLink>
            ) : (
                <button 
                    onClick={handleLogout} 
                    className="text-white no-underline p-2 rounded hover:bg-gray-700 transition duration-300"
                >
                    Logout
                </button>
            )}
            <NavLink 
                to="/addStudent" 
                className={({ isActive }) => 
                    isActive ? "text-white no-underline p-2 rounded bg-blue-500" : "text-white no-underline p-2 rounded hover:bg-gray-700 transition duration-300"
                }
            >
                Add Student
            </NavLink>
            <NavLink 
                to="/manageStudent" 
                className={({ isActive }) => 
                    isActive ? "text-white no-underline p-2 rounded bg-blue-500" : "text-white no-underline p-2 rounded hover:bg-gray-700 transition duration-300"
                }
            >
                Manage Student
            </NavLink>
        </div>
    );
};

export default Navbar;
