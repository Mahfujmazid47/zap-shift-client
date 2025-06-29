import React from 'react';
import { FaEye, FaTrash, FaMoneyCheckAlt } from 'react-icons/fa';

const ParcelTable = ({ parcels = [], onView, onPay, onDelete }) => {

    const formatDate = (iso) => {
        return new Date(iso).toLocaleString();
    }

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                <thead className="bg-base-200 text-base font-semibold">
                    <tr>
                        <th>#</th>
                        <th>Tracking ID</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Created At</th>
                        <th>Cost</th>
                        <th>Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map((parcel, index) => (
                        <tr key={parcel._id}>
                            <th>{index + 1}</th>

                            <td className="font-mono text-sm">{parcel.tracking_Id}</td>

                            <td className='max-w-[180px] truncate'>
                                {parcel.title}
                            </td>

                            <td>
                                <span className={`badge ${parcel.type === 'document' ? 'badge-info' : 'badge-warning'} badge-sm capitalize font-semibold`}>
                                    {parcel.type}
                                </span>
                            </td>

                            <td>
                                {formatDate(parcel.creation_date)}
                            </td>

                            <td className="text-right font-semibold text-green-600">৳{parcel.cost}</td>

                            <td>
                                <span className={`badge badge-sm ${parcel.payment_status === 'paid' ? 'badge-success' : 'badge-error'}`}>
                                    {parcel.payment_status}
                                </span>
                            </td>

                            <td className="flex gap-2">
                                <button
                                    onClick={() => onView(parcel)}
                                    className="btn btn-xs btn-outline btn-info"
                                    title="View Details"
                                >
                                    <FaEye />
                                </button>

                                {parcel.payment_status === 'unpaid' ? (
                                    <button
                                        onClick={() => onPay(parcel._id)}
                                        className="btn btn-xs btn-outline btn-success"
                                        title="Pay Now"
                                    >
                                        <FaMoneyCheckAlt />
                                    </button>
                                )
                                    :
                                    <button disabled
                                        className="btn btn-xs btn-outline btn-success"
                                        title="Paid"
                                    >
                                        <FaMoneyCheckAlt />
                                    </button>
                            }

                                <button
                                    onClick={() => onDelete(parcel._id)}
                                    className="btn btn-xs btn-outline btn-error"
                                    title="Delete"
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}

                    {/* { parcels.length === 0 && (
                        <tr>
                            <td colSpan='6' className='text-center text-gray-500 py-6'>
                                No Parcels found.
                            </td>
                        </tr>
                    )} */}

                </tbody>
            </table>
        </div>
    );
};

export default ParcelTable;
