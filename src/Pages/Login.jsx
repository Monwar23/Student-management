import { toast, ToastContainer } from "react-toastify";
import UseAuth from "../hook/UseAuth";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const { googleLogin, user, loading } = UseAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/manageStudent');
        }
    }, [navigate, user]);

    const handleGoogleSignIn = async () => {
        try {
            await googleLogin();
            toast.success('Sign-In Successful');
            setTimeout(()=>{
                navigate('/manageStudent'); 
            },3000)

        } catch (err) {
            toast.error(err.message);
        }
    };

    if(user || loading) return
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <Helmet>
                <title>StudentData | Login</title>
            </Helmet>
            <h1 className="mb-6 text-3xl font-bold text-gray-800">Login Now</h1>
            <button
                onClick={handleGoogleSignIn}
                className="flex items-center px-6 py-3 text-lg font-semibold text-gray-700 bg-white border border-gray-300 rounded shadow hover:bg-gray-100 transition duration-300"
            >
                <FcGoogle size={32} className="mr-2" />
                Sign in with Google
            </button>
            <ToastContainer />
        </div>
    );
};

export default Login;
