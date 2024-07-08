import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiShow } from 'react-icons/bi';
import { HiOutlineSearch } from 'react-icons/hi';
import { RiDeleteBinLine } from 'react-icons/ri';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

const ManageStudent = () => {
    const [students, setStudents] = useState([]);
    const [control, setControl] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
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

    useEffect(() => {
        fetch(`https://student-management-server-sigma.vercel.app/students?name=${searchTerm}&sort=${sortOrder}`)
            .then(res => res.json())
            .then(data => setStudents(data));
    }, [control, searchTerm, sortOrder]);

    const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const openViewModal = (student) => {
        setSelectedStudent(student);
        setViewModalIsOpen(true);
    };

    const closeViewModal = () => {
        setViewModalIsOpen(false);
        setSelectedStudent(null);
    };

    const openEditModal = (student) => {
        setSelectedStudent(student);
        setEditModalIsOpen(true);
    };

    const closeEditModal = () => {
        setEditModalIsOpen(false);
        setSelectedStudent(null);
    };

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://student-management-server-sigma.vercel.app/students/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Your file has been deleted.", "success");
                            setControl(!control);
                        }
                    });
            }
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedStudent = {
            firstName: e.target.firstName.value,
            middleName: e.target.middleName.value,
            lastName: e.target.lastName.value,
            studentClass: e.target.studentClass.value,
            division: e.target.division.value,
            rollNumber: parseInt(e.target.rollNumber.value),
            addressLine1: e.target.addressLine1.value,
            addressLine2: e.target.addressLine2.value,
            landmark: e.target.landmark.value,
            city: e.target.city.value,
            pincode: e.target.pincode.value
        };

        fetch(`https://student-management-server-sigma.vercel.app/students/${selectedStudent._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedStudent)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire("Updated!", "Student details have been updated.", "success");
                    setControl(!control);
                    closeEditModal();
                }
            });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePrint = () => {
        window.print();
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = students.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(students.length / itemsPerPage);

    const convertToRoman = (num) => {
        const romanNumeralMap = {
            1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI',
            7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X', 11: 'XI', 12: 'XII'
        };
        return romanNumeralMap[num] || num;
    };

    return (
        <div className="p-4">
            <Helmet>
                <title>StudentData | Manage Student</title>
            </Helmet>
            <div className="max-w-7xl mx-auto">
                <div className="md:flex justify-center mb-4 gap-3">
                    <h2 className="text-2xl font-bold mb-6">Manage Student</h2>
                    <div className='md:flex gap-2'>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="py-5 border text-gray-500 border-gray-200 rounded-md pl-6"
                            />
                            <HiOutlineSearch className="absolute top-1/2 transform -translate-y-1/2 text-gray-500 pl-1 text-xl" />
                        </div>
                        <select value={sortOrder} onChange={handleSortChange} className="p-1 border border-gray-200 text-gray-500 mt-2 md:mt-0 rounded-md">
                            <option value="asc">Filter by Roll</option>
                            <option value="desc">Filter by Roll</option>
                        </select>
                    </div>
                    <div>
                        <button className="px-4 py-2 border-2 border-gray-200 text-gray-500 rounded-md mt-2 md:mt-0">Export</button>
                    </div>
                    <div>
                        <button onClick={handlePrint} className="px-4 py-2 border-2 border-gray-200 text-gray-500  rounded-md mt-2 md:mt-0">Print</button>
                    </div>
                    <p className="text-gray-600 mt-2 md:mt-0">{formattedDate}</p>
                </div>
                <table className=" lg:min-w-[990px] divide-y border divide-gray-200 rounded-md">
                    <thead className="bg-[#F33823]">
                        <tr>
                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Class</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Roll No.</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">VIew/Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((student, index) => (
                            <tr key={student._id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FFF6F5]'}>
                                <td className="px-6 py-4 text-center whitespace-nowrap">{student.firstName} {student.middleName} {student.lastName}</td>
                                <td className="px-6 py-4 text-center whitespace-nowrap">{convertToRoman(student.studentClass)}-{student.division}</td>
                                <td className="px-6 py-4 text-center whitespace-nowrap">{student.rollNumber}</td>
                                <td className="px-6 py-4 text-center whitespace-nowrap">
                                    <button onClick={() => openViewModal(student)} className="text-[#F33823] hover:text-blue-500"><BiShow /></button>
                                    <button onClick={() => openEditModal(student)} className="ml-4 text-[#F33823] hover:text-yellow-500"><AiOutlineEdit /></button>
                                    <button onClick={() => handleDelete(student._id)} className="ml-4 text-[#F33823] hover:text-red-500"><RiDeleteBinLine /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 mx-1 bg-gray-200 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>

            {selectedStudent && (
                <Modal
                    isOpen={viewModalIsOpen}
                    onRequestClose={closeViewModal}
                    contentLabel="View Student"
                    className="p-4 bg-white border rounded-lg shadow-lg max-w-3xl mx-auto mt-10"
                    overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
                >
                    <h2 className="text-2xl font-bold mb-4">View Student Details</h2>
                    <div className="space-y-2">
                        <p><strong>Name:</strong> {selectedStudent.firstName} {selectedStudent.middleName} {selectedStudent.lastName}</p>
                        <p><strong>Class:</strong> {convertToRoman(selectedStudent.studentClass)}-{selectedStudent.division}</p>
                        <p><strong>Roll Number:</strong> {selectedStudent.rollNumber}</p>
                        <p><strong>Address Line 1:</strong> {selectedStudent.addressLine1}</p>
                        <p><strong>Address Line 2:</strong> {selectedStudent.addressLine2}</p>
                        <p><strong>Landmark:</strong> {selectedStudent.landmark}</p>
                        <p><strong>City:</strong> {selectedStudent.city}</p>
                        <p><strong>Pincode:</strong> {selectedStudent.pincode}</p>
                    </div>
                    <button
                        onClick={closeViewModal}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                        Close
                    </button>
                </Modal>
            )}


            {selectedStudent && (
                <Modal
                    isOpen={editModalIsOpen}
                    onRequestClose={closeEditModal}
                    contentLabel="Edit Student"
                    className="p-4 bg-white border rounded shadow-md max-w-xl mx-auto mt-10"
                    overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
                >
                    <h2 className="text-xl font-bold mb-4">Edit Student Info</h2>
                    <form onSubmit={handleEditSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <div className="mb-2">
                            <label className="block font-semibold mb-1" htmlFor="firstName">First Name:</label>
                            <input className="w-full p-2 border border-gray-200 rounded" type="text" id="firstName" name="firstName" defaultValue={selectedStudent.firstName} required />
                        </div>
                        <div className="mb-2">
                            <label className="block font-semibold mb-1" htmlFor="middleName">Middle Name:</label>
                            <input className="w-full p-2 border border-gray-200 rounded" type="text" id="middleName" name="middleName" defaultValue={selectedStudent.middleName} required />
                        </div>
                        <div className="mb-2">
                            <label className="block font-semibold mb-1" htmlFor="lastName">Last Name:</label>
                            <input className="w-full p-2 border border-gray-200 rounded" type="text" id="lastName" name="lastName" defaultValue={selectedStudent.lastName} required />
                        </div>
                        <div className="mb-2">
                            <label className="block font-semibold mb-1" htmlFor="studentClass">Class:</label>
                            <select className="w-full p-2 border border-gray-200 rounded" id="studentClass" name="studentClass" defaultValue={selectedStudent.studentClass} required>
                                <option value="1">I</option>
                                <option value="2">II</option>
                                <option value="3">III</option>
                                <option value="4">IV</option>
                                <option value="5">V</option>
                                <option value="6">VI</option>
                                <option value="7">VII</option>
                                <option value="8">VIII</option>
                                <option value="9">IX</option>
                                <option value="10">X</option>
                                <option value="11">XI</option>
                                <option value="12">XII</option>
                            </select>
                        </div>
                        <div className="mb-2">
                            <label className="block font-semibold mb-1" htmlFor="division">Division:</label>
                            <input className="w-full p-2 border border-gray-200 rounded" type="text" id="division" name="division" defaultValue={selectedStudent.division} required />
                        </div>
                        <div className="mb-2">
                            <label className="block font-semibold mb-1" htmlFor="rollNumber">Roll Number:</label>
                            <input className="w-full p-2 border border-gray-200 rounded" type="number" id="rollNumber" name="rollNumber" defaultValue={selectedStudent.rollNumber} required />
                        </div>
                        <div className="mb-2">
                            <label className="block font-semibold mb-1" htmlFor="addressLine1">Address Line 1:</label>
                            <input className="w-full p-2 border border-gray-200 rounded" type="text" id="addressLine1" name="addressLine1" defaultValue={selectedStudent.addressLine1} required />
                        </div>
                        <div className="mb-2">
                            <label className="block font-semibold mb-1" htmlFor="addressLine2">Address Line 2:</label>
                            <input className="w-full p-2 border border-gray-200 rounded" type="text" id="addressLine2" name="addressLine2" defaultValue={selectedStudent.addressLine2} required />
                        </div>
                        <div className="mb-2">
                            <label className="block font-semibold mb-1" htmlFor="landmark">Landmark:</label>
                            <input className="w-full p-2 border border-gray-200 rounded" type="text" id="landmark" name="landmark" defaultValue={selectedStudent.landmark} required />
                        </div>
                        <div className="mb-2">
                            <label className="block font-semibold mb-1" htmlFor="city">City:</label>
                            <input className="w-full p-2 border border-gray-200 rounded" type="text" id="city" name="city" defaultValue={selectedStudent.city} required />
                        </div>
                        <div className="mb-2">
                            <label className="block font-semibold mb-1" htmlFor="pincode">Pincode:</label>
                            <input className="w-full p-2 border border-gray-200 rounded" type="text" id="pincode" name="pincode" defaultValue={selectedStudent.pincode} required />
                        </div>
                        <div className="flex justify-end col-span-1 lg:col-span-3">
                            <button type="submit" className="px-4 py-2 bg-[#F33823] hover:text-[#F33823] hover:bg-white border-2 border-[#F33823] text-white rounded">Save</button>
                            <button onClick={closeEditModal} className="ml-2 px-4 py-2 bg-gray-300 hover:bg-white hover:border text-black rounded">Cancel</button>
                        </div>
                    </form>
                </Modal>
            )}

        </div>
    );
};

export default ManageStudent;
