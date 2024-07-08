import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

const ManageStudent = () => {
    const [students, setStudents] = useState([]);
    const [control, setControl] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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
            rollNumber: e.target.rollNumber.value,
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

    return (
        <div className="p-4">
            <Helmet>
                <title>StudentData | Manage Student</title>
            </Helmet>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-center mb-4 gap-5">
                    <div>
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="p-2 border rounded mr-2"
                        />
                        <select value={sortOrder} onChange={handleSortChange} className="p-2 border rounded">
                            <option value="asc">Ascending by Roll</option>
                            <option value="desc">Descending by Roll</option>
                        </select>
                    </div>
                    <div>
                        <button onClick={handlePrint} className="px-4 py-2 bg-blue-600 text-white rounded">Print</button>
                    </div>
                </div>
                <table className="mx-auto divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Division</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Roll Number</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((student) => (
                            <tr key={student._id}>
                                <td className="px-6 py-4 text-center whitespace-nowrap">{student.firstName} {student.middleName} {student.lastName}</td>
                                <td className="px-6 py-4 text-center whitespace-nowrap">{student.studentClass}</td>
                                <td className="px-6 py-4 text-center whitespace-nowrap">{student.division}</td>
                                <td className="px-6 py-4 text-center whitespace-nowrap">{student.rollNumber}</td>
                                <td className="px-6 py-4 text-center whitespace-nowrap">
                                    <button onClick={() => openViewModal(student)} className="text-blue-600 hover:text-blue-900">View</button>
                                    <button onClick={() => openEditModal(student)} className="ml-4 text-yellow-600 hover:text-yellow-900">Edit</button>
                                    <button onClick={() => handleDelete(student._id)} className="ml-4 text-red-600 hover:text-red-900">Delete</button>
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
                    className="p-4 bg-white border rounded shadow-md max-w-xl mx-auto mt-10"
                    overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
                >
                    <h2 className="text-xl font-semibold mb-4">Student Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p className="font-medium">First Name:</p>
                            <p>{selectedStudent.firstName}</p>
                        </div>
                        <div>
                            <p className="font-medium">Middle Name:</p>
                            <p>{selectedStudent.middleName}</p>
                        </div>
                        <div>
                            <p className="font-medium">Last Name:</p>
                            <p>{selectedStudent.lastName}</p>
                        </div>
                        <div>
                            <p className="font-medium">Class:</p>
                            <p>{selectedStudent.studentClass}</p>
                        </div>
                        <div>
                            <p className="font-medium">Division:</p>
                            <p>{selectedStudent.division}</p>
                        </div>
                        <div>
                            <p className="font-medium">Roll Number:</p>
                            <p>{selectedStudent.rollNumber}</p>
                        </div>
                        <div>
                            <p className="font-medium">Address Line 1:</p>
                            <p>{selectedStudent.addressLine1}</p>
                        </div>
                        <div>
                            <p className="font-medium">Address Line 2:</p>
                            <p>{selectedStudent.addressLine2}</p>
                        </div>
                        <div>
                            <p className="font-medium">Landmark:</p>
                            <p>{selectedStudent.landmark}</p>
                        </div>
                        <div>
                            <p className="font-medium">City:</p>
                            <p>{selectedStudent.city}</p>
                        </div>
                        <div>
                            <p className="font-medium">Pincode:</p>
                            <p>{selectedStudent.pincode}</p>
                        </div>
                    </div>
                    <button onClick={closeViewModal} className="mt-4 px-4 py-2 bg-gray-200 rounded">Close</button>
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
                    <h2 className="text-xl font-semibold mb-4">Edit Student Details</h2>
                    <form onSubmit={handleEditSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="font-medium">First Name:</label>
                            <input type="text" name="firstName" defaultValue={selectedStudent.firstName} className="w-full px-2 py-1 border rounded"/>
                        </div>
                        <div>
                            <label className="font-medium">Middle Name:</label>
                            <input type="text" name="middleName" defaultValue={selectedStudent.middleName} className="w-full px-2 py-1 border rounded"/>
                        </div>
                        <div>
                            <label className="font-medium">Last Name:</label>
                            <input type="text" name="lastName" defaultValue={selectedStudent.lastName} className="w-full px-2 py-1 border rounded"/>
                        </div>
                        <div>
                            <label className="font-medium">Class:</label>
                            <select name="studentClass" defaultValue={selectedStudent.studentClass} className="w-full px-2 py-1 border rounded">
                                {Array.from({ length: 12 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>{index + 1}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="font-medium">Division:</label>
                            <select name="division" defaultValue={selectedStudent.division} className="w-full px-2 py-1 border rounded">
                                {['A', 'B', 'C', 'D', 'E'].map((division) => (
                                    <option key={division} value={division}>{division}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="font-medium">Roll Number:</label>
                            <input type="number" name="rollNumber" defaultValue={selectedStudent.rollNumber} className="w-full px-2 py-1 border rounded"/>
                        </div>
                        <div>
                            <label className="font-medium">Address Line 1:</label>
                            <input type="text" name="addressLine1" defaultValue={selectedStudent.addressLine1} className="w-full px-2 py-1 border rounded"/>
                        </div>
                        <div>
                            <label className="font-medium">Address Line 2:</label>
                            <input type="text" name="addressLine2" defaultValue={selectedStudent.addressLine2} className="w-full px-2 py-1 border rounded"/>
                        </div>
                        <div>
                            <label className="font-medium">Landmark:</label>
                            <input type="text" name="landmark" defaultValue={selectedStudent.landmark} className="w-full px-2 py-1 border rounded"/>
                        </div>
                        <div>
                            <label className="font-medium">City:</label>
                            <input type="text" name="city" defaultValue={selectedStudent.city} className="w-full px-2 py-1 border rounded"/>
                        </div>
                        <div>
                            <label className="font-medium">Pincode:</label>
                            <input type="text" name="pincode" minLength={4} maxLength={6} defaultValue={selectedStudent.pincode} className="w-full px-2 py-1 border rounded"/>
                        </div>
                        <div className="col-span-2">
                            <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                            <button type="button" onClick={closeEditModal} className="mt-4 ml-4 px-4 py-2 bg-gray-200 rounded">Cancel</button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default ManageStudent;
