import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditDepartment = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState({ dep_name: '', description: '' });
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartment = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:4000/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.data.success) {
                    setDepartment(response.data.department);
                } else {
                    alert('Failed to fetch department details');
                }
            } catch (error) {
                console.error('Error:', error);
                alert(error.response?.data?.error || 'An error occurred while fetching department details');
            } finally {
                setLoading(false);
            }
        };

        fetchDepartment();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await axios.put(
                `http://localhost:4000/api/department/${id}`, // Correct endpoint for updating
                department,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.data.success) {
                alert('Department updated successfully');
                navigate('/admin-dashboard/departments');
            } else {
                alert('Failed to update department');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error.response?.data?.error || 'An error occurred during submission');
        } finally {
            setSubmitting(false);
        }
    };
    
    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-6">Edit Department</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="dep_name"
                                className="text-sm font-medium text-gray-700"
                            >
                                Department Name
                            </label>
                            <input
                                type="text"
                                name="dep_name"
                                onChange={handleChange}
                                value={department.dep_name}
                                placeholder="Enter department name"
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mt-3">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <textarea
                                name="description"
                                onChange={handleChange}
                                value={department.description}
                                placeholder="Enter description"
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                rows="4"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                            disabled={submitting}
                        >
                            {submitting ? 'Updating...' : 'Edit Department'}
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default EditDepartment;
