import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="flex justify-around items-center bg-gray-800 p-4">
            <NavLink 
                to="/" 
                className={({ isActive }) => 
                    isActive ? "text-white no-underline p-2 rounded bg-blue-500" : "text-white no-underline p-2 rounded hover:bg-gray-700 transition duration-300"
                }
            >
                Login
            </NavLink>
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
