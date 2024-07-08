import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import UseAuth from "../hook/UseAuth";
import { CiUser } from "react-icons/ci";

const Root = () => {

    const {user}=UseAuth()
    return (
        <div className="max-w-7xl mx-auto bg-[#FFF6F5]">
            <div className="text-lg flex justify-between px-10 pt-2">
                <h2 className="text-xl font-bold text-[#F33823]">Dev Cluster</h2>
                    {user && <span className="flex items-center border p-1 rounded-md"><CiUser className="mr-2" />{user.email}</span>}
                </div>
            <div className="flex">
            <div className="w-60">
            <Navbar></Navbar>
            </div>
            <div className="">
            <Outlet></Outlet>
            </div>
            </div>
        </div>
    );
};

export default Root;