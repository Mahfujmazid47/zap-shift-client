import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaUserPlus, FaEye } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import Loading from "../../../Shared/Loading/Loading";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Load all eligible parcels
  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ["assignable-parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?email=${user.email}&payment_status=paid&delivery_status=not_collected`
      );
      return res.data;
    },
  });

  // Open modal and store parcel
  const openModal = (parcel) => {
    setSelectedParcel(parcel);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedParcel(null);
    setIsOpen(false);
  };

  // Load matching riders based on delivery district === rider region
  const { data: riders = [] } = useQuery({
    queryKey: ["riders", selectedParcel?.deliveryServiceCenter],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active-riders");
      return res.data.filter(
        (rider) =>  rider.district === selectedParcel?.deliveryServiceCenter
      );
    },
  });

console.log("Parcel Delivery Service Center:", selectedParcel?.deliveryServiceCenter);
console.log("Matched Riders:", riders);

  const handleAssign = async (riderId,rider_name) => {
    try {
      const res = await axiosSecure.patch(`/parcels/assign/${selectedParcel._id}`, {
        assignedRiderId: riderId,
        rider_name,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Rider assigned successfully.", "success");
        refetch();
        closeModal();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to assign rider.", error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Assign Rider to Parcels</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Pickup</th>
              <th>Delivery</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.tracking_Id}</td>
                <td>{parcel.senderName}</td>
                <td>{parcel.receiverName}</td>
                <td>{parcel.pickupServiceCenter}</td>
                <td>{parcel.deliveryServiceCenter}</td>
                <td>
                  <button
                    className="btn btn-sm  btn-success flex items-center gap-1"
                    onClick={() => openModal(parcel)}
                  >
                    <FaUserPlus /> Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg bg-white p-6 rounded shadow">
            <Dialog.Title className="text-lg font-bold mb-4">
              Select Rider for: {selectedParcel?.tracking_Id}
            </Dialog.Title>
            {riders.length ? (
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {riders.map((rider) => (
                  <div key={rider._id} className="border p-3 rounded flex justify-between items-center">
                    <div>
                      <p><strong>{rider.name}</strong></p>
                      <p>{rider.contact}</p>
                    </div>
                    <button
                      className="btn btn-sm btn-primary text-black"
                      onClick={() => handleAssign(rider._id,rider.name)}
                    >
                      Assign
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-500">No available riders in this region.</p>
            )}
            <div className="mt-4 text-right">
              <button className="btn btn-sm btn-error" onClick={closeModal}>
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default AssignRider;
