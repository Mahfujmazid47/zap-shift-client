import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card || card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setError(error.message)
        }
        else {
            setError('');
            console.log(paymentMethod)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-md p-6 rounded-2xl bg-gray-100 mx-auto space-y-4">
                <CardElement className='p-2'>

                </CardElement>
                <button
                    type='submit'
                    className="btn bg-primary text-black w-full"
                    disabled={!stripe}>
                    Pay for Parcel Pickup
                </button>
                {error && <p className='text-red-500'>{error}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;