import React, { Suspense } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import ParcelTable from './ParcelTable';
import Swal from 'sweetalert2';
import { useNavigate, useNavigation } from 'react-router';
import Loading from '../../../Shared/Loading/Loading';

const MyParcels = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const navigation = useNavigation();
    console.log(navigation.state)

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    });
    // console.log(parcels);

    const handleView = (id) => {
        navigate(`/dashboard/payment/${id}`)
    };

    const handlePay = (id) => {
        navigate(`/dashboard/payment/${id}`)
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to delete this parcel?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Parcel has been deleted.',
                                'success'
                            );
                            // Optional: refetch to update list
                            refetch && refetch();
                        }
                    })
                    .catch((error) => {
                        console.error('Delete Error:', error);
                        Swal.fire('Error', 'Something went wrong while deleting!', 'error');
                    });
            }
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Parcels</h2>
            <div>
                <Suspense fallback={<Loading />}>
                    {
                        navigation.state === 'loading' ? <Loading />
                            :
                            <ParcelTable
                                parcels={parcels}
                                onView={handleView}
                                onPay={handlePay}
                                onDelete={handleDelete}
                            ></ParcelTable>
                    }
                </Suspense>
            </div>
        </div>
    );
};

export default MyParcels;