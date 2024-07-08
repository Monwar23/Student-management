import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = () => {
    const navigate=useNavigate()

    const initialFormData = {
        firstName: '',
        middleName: '',
        lastName: '',
        class: '1',
        division: 'A',
        rollNumber: '',
        addressLine1: '',
        addressLine2: '',
        landmark: '',
        city: '',
        pincode: '',
        profilePicture: null
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            profilePicture: file
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        fetch('https://student-management-server-sigma.vercel.app/addStudents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.insertedId) {
                    toast('Student Added Successfully');
                    setTimeout(()=>{
                        navigate('/manageStudent'); 
                    },3000)
                    setFormData(initialFormData); 
                    e.target.reset(); 
                }
            });
    };

    return (
       <div>
         <Helmet>
                <title>StudentData | Add student</title>
            </Helmet>
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Student</h2>
            <form onSubmit={handleSubmit} className=" grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                    <label className="block mb-1">
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="form-input border-blue-500 border-2 py-1 px-1 mt-1 block w-full rounded-md outline-blue-500 focus:ring-opacity-50"
                            placeholder="Enter First Name"
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className="block mb-1">
                        Middle Name:
                        <input
                            type="text"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleChange}
                            className="form-input border-blue-500 border-2 py-1 px-1 mt-1 block w-full rounded-md outline-blue-500 focus:ring-opacity-50"
                            placeholder="Enter Middle Name"
                        />
                    </label>
                </div>
                <div>
                    <label className="block mb-1">
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="form-input border-blue-500 border-2 py-1 px-1 mt-1 block w-full rounded-md outline-blue-500 focus:ring-opacity-50"
                            placeholder="Enter Last Name"
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className="block mb-1">
                        Class:
                        <select
                            name="studentClass"
                            value={formData.studentClass}
                            onChange={handleChange}
                            className="form-input border-blue-500 border-2 py-1 px-1 mt-1 block w-full rounded-md outline-blue-500 focus:ring-opacity-50"
                            required
                        >
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label className="block mb-1">
                        Division:
                        <select
                            name="division"
                            value={formData.division}
                            onChange={handleChange}
                            className="form-input border-blue-500 border-2 py-1 px-1 mt-1 block w-full rounded-md outline-blue-500 focus:ring-opacity-50"
                            required
                        >
                            {['A', 'B', 'C', 'D', 'E'].map((division) => (
                                <option key={division} value={division}>
                                    {division}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label className="block mb-1">
                        Roll Number:
                        <input
                            type="number"
                            name="rollNumber"
                            value={formData.rollNumber}
                            onChange={handleChange}
                            className="form-input border-blue-500 border-2 py-1 px-1 mt-1 block w-full rounded-md outline-blue-500 focus:ring-opacity-50"
                            placeholder="Enter Roll Number"
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className="block mb-1">
                        Address Line 1:
                        <textarea
                            name="addressLine1"
                            value={formData.addressLine1}
                            onChange={handleChange}
                            className="form-input border-blue-500 border-2 py-1 px-1 mt-1 block w-full rounded-md outline-blue-500 focus:ring-opacity-50"
                            placeholder="Enter Address Line 1"
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className="block mb-1">
                        Address Line 2:
                        <textarea
                            name="addressLine2"
                            value={formData.addressLine2}
                            onChange={handleChange}
                            className="form-input border-blue-500 border-2 py-1 px-1 mt-1 block w-full rounded-md outline-blue-500 focus:ring-opacity-50"
                            placeholder="Enter Address Line 2"
                        />
                    </label>
                </div>
                <div>
                    <label className="block mb-1">
                        Landmark:
                        <input
                            type="text"
                            name="landmark"
                            value={formData.landmark}
                            onChange={handleChange}
                            className="form-input border-blue-500 border-2 py-1 px-1 mt-1 block w-full rounded-md outline-blue-500 focus:ring-opacity-50"
                            placeholder="Enter Landmark"
                        />
                    </label>
                </div>
                <div>
                    <label className="block mb-1">
                        City:
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="form-input border-blue-500 border-2 py-1 px-1 mt-1 block w-full rounded-md outline-blue-500 focus:ring-opacity-50"
                            placeholder="Enter City"
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className="block mb-1">
                        Pincode:
                        <input
                            type="number"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            className="form-input border-blue-500 border-2 py-1 px-1 mt-1 block w-full rounded-md outline-blue-500 focus:ring-opacity-50"
                            placeholder="Enter Pincode"
                            minLength={4}
                            maxLength={6}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className="block mb-1">
                        Student's Profile Picture:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="form-input border-blue-500 border-2 py-1 px-1 mt-1 block w-full rounded-md outline-blue-500 focus:ring-opacity-50"
                        />
                    </label>
                </div>
                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Student
                    </button>
                </div>
            </form>
            <ToastContainer></ToastContainer>
        </div>
       </div>
    );
};

export default AddStudent;
