import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaEye, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';
import Loading from '../../../Shared/Loading/Loading';

const PendingRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedRider, setSelectedRider] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const { isPending, data: pendingRiders = [], refetch } = useQuery({
        queryKey: ['pending-riders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/pending-riders');
            return res.data;
        },
    });

    if (isPending) {
        return <Loading />
    };

    const handleDecision = async (id, decisionType) => {
        const actionText = decisionType === 'active' ? 'Active' : 'Reject';
        const result = await Swal.fire({
            title: `Are you sure?`,
            text: `Do you want to ${actionText.toLowerCase()} this rider?`,
            icon: decisionType === 'active' ? 'question' : 'warning',
            showCancelButton: true,
            confirmButtonColor: decisionType === 'active' ? '#16a34a' : '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: `Yes, ${actionText}`,
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.patch(`/riders/status/${id}`, {
                    status: decisionType
                });


                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: `${actionText}d!`,
                        text: `Rider has been ${decisionType}d.`,
                        confirmButtonColor: '#16a34a'
                    });
                    setIsOpen(false);
                    refetch();
                }
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'Something went wrong!', 'error');
            }
        }
    };



    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Region</th>
                            <th>District</th>
                            <th>Contact</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingRiders.map((rider, index) => (
                            <tr key={rider._id}>
                                <td>{index + 1}</td>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.region}</td>
                                <td>{rider.district}</td>
                                <td>{rider.contact}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-info text-white flex items-center gap-1"
                                        onClick={() => {
                                            setSelectedRider(rider);
                                            setIsOpen(true);
                                        }}
                                    >
                                        <FaEye /> View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6 shadow-xl">
                        <Dialog.Title className="text-lg font-bold mb-2">Rider Details</Dialog.Title>
                        {selectedRider && (
                            <div className="space-y-2">
                                <p><strong>Name:</strong> {selectedRider.name}</p>
                                <p><strong>Email:</strong> {selectedRider.email}</p>
                                <p><strong>NID:</strong> {selectedRider.nid}</p>
                                <p><strong>Age:</strong> {selectedRider.age}</p>
                                <p><strong>Region:</strong> {selectedRider.region}</p>
                                <p><strong>District:</strong> {selectedRider.district}</p>
                                <p><strong>Contact:</strong> {selectedRider.contact}</p>

                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        className="btn btn-success flex items-center gap-1"
                                        onClick={() => handleDecision(selectedRider._id, 'active')}
                                    >
                                        <FaCheckCircle /> Approve
                                    </button>
                                    <button
                                        className="btn btn-error flex items-center gap-1"
                                        onClick={() => handleDecision(selectedRider._id, 'reject')}
                                    >
                                        <FaTimesCircle /> Reject
                                    </button>
                                </div>
                            </div>
                        )}
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default PendingRiders;
