import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared/Loading/Loading';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { isPending, data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure(`/payments?email=${user.email}`);
            return res.data;
        }
    })

    if (isPending) {
        return <Loading />
    }
    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
            
            <div className="overflow-x-auto my-10">
                <table className="table table-zebra w-full">
                    <thead className="bg-primary text-black">
                        <tr>
                            <th>#</th>
                            <th>User Email</th>
                            <th>Amount</th>
                            <th>Payment Method</th>
                            <th>Transaction ID</th>
                            <th>Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment.transactionId}>
                                <td>{index + 1}</td>
                                <td>{payment.userEmail}</td>
                                <td>${payment.amount}</td>
                                <td>{payment.paymentMethod?.join(', ')}</td>
                                <td className="text-sm break-all">{payment.transactionId}</td>
                                <td>{new Date(payment.paymentDate).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;