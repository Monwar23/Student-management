import { NavLink } from "react-router-dom";
import UseAuth from "../hook/UseAuth";
import { GoPeople } from "react-icons/go";
import { PiUserListLight } from "react-icons/pi";
import { MdOutlineLogout } from "react-icons/md";

const Navbar = () => {
    const { user, logOut } = UseAuth();

    const handleLogout = () => {
        logOut();
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 h-screen">
            
            <NavLink 
                to="/addStudent" 
                className={({ isActive }) => 
                    isActive ? "text-white no-underline p-2 rounded bg-[#F33823] w-full text-left flex items-center" : "no-underline p-2 rounded hover:text-[#F33823] transition duration-300 w-full text-left flex items-center"
                }
            >
                <GoPeople className="mr-2" />
                <span>Add Student</span>
            </NavLink>

            <NavLink 
                to="/manageStudent" 
                className={({ isActive }) => 
                    isActive ? "text-white no-underline p-2 rounded bg-[#F33823] w-full text-left flex items-center" : "no-underline p-2 rounded hover:text-[#F33823] transition duration-300 w-full text-left flex items-center"
                }
            >
                <PiUserListLight className="mr-2" />
                <span>Manage Student</span>
            </NavLink>

            {!user ? (
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        isActive ? "text-white no-underline p-2 rounded bg-[#F33823] w-full text-left flex items-center" : "no-underline p-2 rounded hover:text-[#F33823] transition duration-300 w-full text-left flex items-center"
                    }
                >
                    <MdOutlineLogout className="mr-2" />
                    <span>Login</span>
                </NavLink>
            ) : (
                <button 
                    onClick={handleLogout} 
                    className="no-underline p-2 rounded hover:text-[#F33823] transition duration-300 w-full text-left flex items-center"
                >
                    <MdOutlineLogout className="mr-2" />
                    <span>Logout</span>
                </button>
            )}
        </div>
    );
};

export default Navbar;
