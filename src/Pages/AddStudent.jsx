import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    });
    const navigate = useNavigate();

    const initialFormData = {
        firstName: '',
        middleName: '',
        lastName: '',
        studentClass: 'I',
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
                    setTimeout(() => {
                        navigate('/manageStudent');
                    }, 3000);
                    setFormData(initialFormData);
                    e.target.reset();
                }
            });
    };

    const numberToRoman = (num) => {
        const romanNumerals = [
            { value: 1, numeral: 'I' },
            { value: 2, numeral: 'II' },
            { value: 3, numeral: 'III' },
            { value: 4, numeral: 'IV' },
            { value: 5, numeral: 'V' },
            { value: 6, numeral: 'VI' },
            { value: 7, numeral: 'VII' },
            { value: 8, numeral: 'VIII' },
            { value: 9, numeral: 'IX' },
            { value: 10, numeral: 'X' },
            { value: 11, numeral: 'XI' },
            { value: 12, numeral: 'XII' }
        ];
        return romanNumerals.find(r => r.value === num).numeral;
    };

    return (
        <div>
            <Helmet>
                <title>StudentData | Add student</title>
            </Helmet>
            <div className="mx-auto mt-10 p-6 rounded-md">
                <div className='flex justify-between'>
                    <h2 className="text-2xl font-bold mb-6 ">Add Student</h2>
                    <p className="text-gray-600">{formattedDate}</p>
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="form-input border-gray-100 border-2 py-2 px-1 mt-1 block w-full rounded-md outline-gray-100 focus:ring-opacity-50"
                            placeholder="First Name"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleChange}
                            className="form-input border-gray-100 border-2 py-2 px-1 mt-1 block w-full rounded-md outline-gray-100 focus:ring-opacity-50"
                            placeholder="Middle Name"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="form-input border-gray-100 border-2 py-2 px-1 mt-1 block w-full rounded-md outline-gray-100 focus:ring-opacity-50"
                            placeholder="Last Name"
                            required
                        />
                    </div>
                    <div>
                        <select
                            name="studentClass"
                            value={formData.studentClass}
                            onChange={handleChange}
                            className="form-input border-gray-100 border-2 py-2 px-1 mt-1 block w-full rounded-md outline-gray-100 focus:ring-opacity-50"
                            required
                        >
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={numberToRoman(i + 1)}>
                                    {numberToRoman(i + 1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select
                            name="division"
                            value={formData.division}
                            onChange={handleChange}
                            className="form-input border-gray-100 border-2 py-2 px-1 mt-1 block w-full rounded-md outline-gray-100 focus:ring-opacity-50"
                            required
                        >
                            {['A', 'B', 'C', 'D', 'E'].map((division) => (
                                <option key={division} value={division}>
                                    {division}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <input
                            type="number"
                            name="rollNumber"
                            value={formData.rollNumber}
                            onChange={handleChange}
                            className="form-input border-gray-100 border-2 py-2 px-1 mt-1 block w-full rounded-md outline-gray-100 focus:ring-opacity-50"
                            placeholder="Enter Roll"
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            name="addressLine1"
                            value={formData.addressLine1}
                            onChange={handleChange}
                            className="form-input border-gray-100 border-2 py-2 px-1 mt-1 block w-full rounded-md outline-gray-100 focus:ring-opacity-50"
                            placeholder="Address Line 1"
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            name="addressLine2"
                            value={formData.addressLine2}
                            onChange={handleChange}
                            className="form-input border-gray-100 border-2 py-2 px-1 mt-1 block w-full rounded-md outline-gray-100 focus:ring-opacity-50"
                            placeholder="Address Line 2"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="landmark"
                            value={formData.landmark}
                            onChange={handleChange}
                            className="form-input border-gray-100 border-2 py-2 px-1 mt-1 block w-full rounded-md outline-gray-100 focus:ring-opacity-50"
                            placeholder="Landmark"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="form-input border-gray-100 border-2 py-2 px-1 mt-1 block w-full rounded-md outline-gray-100 focus:ring-opacity-50"
                            placeholder="City"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            className="form-input border-gray-100 border-2 py-2 px-1 mt-1 block w-full rounded-md outline-gray-100 focus:ring-opacity-50"
                            placeholder="Pincode"
                            minLength={4}
                            maxLength={6}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="form-input border-gray-100 border-2 py-2 px-1 mt-1 block w-full rounded-md outline-gray-100 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="bg-[#F33823] w-full hover:border-2 hover:border-[#F33823] text-white px-4 py-2 rounded hover:text-[#F33823] hover:bg-white"
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
