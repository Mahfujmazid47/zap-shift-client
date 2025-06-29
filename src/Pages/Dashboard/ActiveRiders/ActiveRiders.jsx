import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaEye, FaToggleOff } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";
import Swal from "sweetalert2";

const ActiveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedRider, setSelectedRider] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const { data: riders = [], isLoading, refetch } = useQuery({
        queryKey: ['active-riders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/active-riders');
            return res.data;
        }
    });

    if (isLoading) {
        return <Loading />;
    }

    const filteredRiders = riders.filter(rider =>
        rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rider.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rider.district.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openModal = (rider) => {
        setSelectedRider(rider);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedRider(null);
    };

    // স্ট্যাটাস আপডেট ফাংশন (activate)
const handleActivate = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to activate this rider?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#16a34a',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, Activate'
  });

  if (result.isConfirmed) {
    try {
      const res = await axiosSecure.patch(`/riders/status/${id}`, { status: 'active' });
      if (res.data.modifiedCount > 0) {
        Swal.fire('Activated!', 'Rider status has been updated.', 'success');
        closeModal();
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  }
};

// স্ট্যাটাস আপডেট ফাংশন (deactivate)
const handleDeactivate = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to deactivate this rider?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d97706',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, Deactivate'
  });

  if (result.isConfirmed) {
    try {
      const res = await axiosSecure.patch(`/riders/status/${id}`, { status: 'deactivate' });
      if (res.data.modifiedCount > 0) {
        Swal.fire('Deactivated!', 'Rider status has been updated.', 'success');
        closeModal();
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  }
};


    return (
        <div className="px-4">
            <h2 className="text-2xl font-bold mb-6">Active Riders</h2>

            <input
                type="text"
                placeholder="Search by name, region or district"
                className="input input-bordered mb-4 w-full max-w-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Region</th>
                            <th>District</th>
                            <th>Contact</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRiders.map((rider, index) => (
                            <tr key={rider._id}>
                                <td>{index + 1}</td>
                                <td>{rider.name}</td>
                                <td>{rider.region}</td>
                                <td>{rider.district}</td>
                                <td>{rider.contact}</td>
                                <td className="flex gap-2">
                                    <button
                                        onClick={() => openModal(rider)}
                                        className="btn btn-sm btn-info text-white flex items-center gap-1"
                                    >
                                        <FaEye /> Details
                                    </button>

                                    {rider.status === 'active' ? (
                                        <button
                                            onClick={() => handleDeactivate(rider._id)}
                                            className="btn btn-sm btn-warning text-white flex items-center gap-1"
                                        >
                                            <FaToggleOff /> Deactivate
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleActivate(rider._id)}
                                            className="btn btn-sm btn-success text-white flex items-center gap-1"
                                        >
                                            Activate
                                        </button>
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
                <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 space-y-4 shadow-xl">
                        <Dialog.Title className="text-xl font-bold">Rider Details</Dialog.Title>
                        {selectedRider && (
                            <div className="space-y-1 text-sm">
                                <p><strong>Name:</strong> {selectedRider.name}</p>
                                <p><strong>Email:</strong> {selectedRider.email}</p>
                                <p><strong>NID:</strong> {selectedRider.nid}</p>
                                <p><strong>Age:</strong> {selectedRider.age}</p>
                                <p><strong>Region:</strong> {selectedRider.region}</p>
                                <p><strong>District:</strong> {selectedRider.district}</p>
                                <p><strong>Contact:</strong> {selectedRider.contact}</p>
                            </div>
                        )}
                        <button
                            className="btn btn-sm btn-error mt-4"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default ActiveRiders;
