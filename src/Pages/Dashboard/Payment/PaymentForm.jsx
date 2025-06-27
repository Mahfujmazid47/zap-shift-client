import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Shared/Loading/Loading';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';

const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const { isPending, isError, data: parcelInfo = {}, errorQ } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })

    if (isPending) {
        return <Loading />
    }

    if (isError) {
        return <span className='text-red-500'>Error: {errorQ.message}</span>
    }

    console.log(parcelInfo)
    const amount = parcelInfo.cost;
    const amountInCents = amount * 100;


    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!stripe || !elements) {
    //         return;
    //     }

    //     const card = elements.getElement(CardElement);
    //     if (!card || card === null) {
    //         return
    //     }

    //     const { error, paymentMethod } = await stripe.createPaymentMethod({
    //         type: 'card',
    //         card
    //     });

    //     if (error) {
    //         setError(error.message)
    //     }
    //     else {
    //         setError('');
    //         console.log(paymentMethod)
    //     }

    //     //step 2: create payment Intent 
    //     // 1. Create Payment Intent
    //     const res = await axiosSecure.post('/create-payment-intent', {
    //         amountInCents,
    //         parcelId
    //     })

    //     const clientSecret = res.data.clientSecret;

    //     // 2. Confirm Card Payment
    //     const result = await stripe.confirmCardPayment(clientSecret, {
    //         payment_method: paymentMethod.id,
    //     });

    //     if(result.error){
    //         console.log(result.error.message)
    //     }
    //     else{
    //         if(result.paymentIntent.status === 'succeeded'){
    //             console.log('payment successful')
    //             // Swal.fire('Payment Successful', `Transaction ID: ${result.paymentIntent.id}`, 'success');
    //         }
    //     }


    //     console.log('res from intent', res)
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        // Step 1: Create Payment Intent (get clientSecret)
        const { data } = await axiosSecure.post('/create-payment-intent', {
            amountInCents,
        });
        const clientSecret = data.clientSecret;

        // Step 2: Confirm Card Payment
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: user?.displayName || 'Anonymous',
                    email: user?.email || 'unknown',
                },
            },
        });

        if (result.error) {
            setError(result.error.message);
        } else {
            setError('')
            if (result.paymentIntent.status === 'succeeded') {
                Swal.fire('Payment Successful', `Transaction ID: ${result.paymentIntent.id}`, 'success');
                console.log(result)

                // step-4 : mark parcel paid also create payment history
                const paymentData = {
                    parcelId,
                    email: user.email,
                    amount,
                    transactionId:result.paymentIntent.id,
                    paymentMethod:result.paymentIntent.payment_method_types,
                };

                const paymentRes = await axiosSecure.post('/payments', paymentData);
                // if(paymentRes.data.insertedId){
                //      Swal.fire('Payment Successful', `Transaction ID: ${result.paymentIntent.id}`, 'success');
                //     console.log('payment successful')
                // }
                console.log(paymentRes)

                navigate('/dashboard/myParcels')

                // Optional: Update parcel payment status
                // await axiosSecure.patch(`/parcels/payment-success/${parcelId}`, {
                //     transactionId: result.paymentIntent.id
                // });
            }
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-md p-6 rounded-2xl bg-gray-100 mx-auto md:my-24 space-y-4">
                <CardElement className='p-2'>

                </CardElement>
                <button
                    type='submit'
                    className="btn bg-primary text-black w-full"
                    disabled={!stripe}>
                    Pay ${amount}
                </button>
                {error && <p className='text-red-500'>{error}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;