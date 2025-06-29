import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaEye } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';
import Loading from '../../../Shared/Loading/Loading';

const RejectedRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedRider, setSelectedRider] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const { isPending, data: rejectedRiders = [] } = useQuery({
        queryKey: ['rejected-riders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/rejected-riders');
            return res.data;
        }
    });

    if (isPending) return <Loading />;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Rejected Riders</h2>
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
                        {rejectedRiders.map((rider, index) => (
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
                            </div>
                        )}
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default RejectedRiders;
