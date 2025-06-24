import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import data from '../../assets/warehouses.json';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const generateTrackingID = () => {
  const date = new Date();
  const datePart = date.toISOString().split('T')[0].replace(/-/g, '');
  const randomFour = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `TRK-${datePart}-${randomFour}`;
};

const SendParcel = () => {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [selectedPickupRegion, setSelectedPickupRegion] = useState('');
  const [selectedDeliveryRegion, setSelectedDeliveryRegion] = useState('');

  const onSubmit = (formData) => {
    const { type, weight, pickupServiceCenter, deliveryServiceCenter } = formData;
    const isSameDistrict = pickupServiceCenter === deliveryServiceCenter;
    const numericWeight = Number(weight);

    let cost = 0;
    let breakdown = '';

    if (type === 'document') {
      cost = isSameDistrict ? 60 : 80;
      breakdown = `Parcel Type: Document\nDelivery Area: ${isSameDistrict ? 'Within District (৳60)' : 'Outside District (৳80)'}`;
    } else if (type === 'non-document') {
      if (numericWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
        breakdown = `Parcel Type: Non-Document\nWeight: ${numericWeight} kg\nDelivery Area: ${isSameDistrict ? 'Within District (৳110)' : 'Outside District (৳150)'}`;
      } else {
        const extraWeight = numericWeight - 3;
        const extraCost = extraWeight * 40;
        if (isSameDistrict) {
          cost = 110 + extraCost;
          breakdown = `Parcel Type: Non-Document\nWeight: ${numericWeight} kg (Extra ${extraWeight} kg × ৳40 = ৳${extraCost})\nBase Price: ৳110\nDelivery Area: Within District`;
        } else {
          cost = 150 + extraCost + 40;
          breakdown = `Parcel Type: Non-Document\nWeight: ${numericWeight} kg (Extra ${extraWeight} kg × ৳40 = ৳${extraCost})\nBase Price: ৳150\n+৳40 Extra for Outside District\nDelivery Area: Outside District`;
        }
      }
    }

    const trackingId = generateTrackingID();
    const formattedBreakdown = breakdown.replace(/\n/g, '<br/>');

    Swal.fire({
      title: 'Confirm Submission',
      html: `
      <strong>Pricing Breakdown:</strong><br/>
      ${formattedBreakdown}<br/><br/>
      <strong style="font-size: 18px;">Total Cost: ৳${cost}</strong><br/><br/>
      Do you want to proceed?
    `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Proceed to Payment',
      cancelButtonText: 'Go Back to Edit',
      focusConfirm: false
    }).then((result) => {
      if (result.isConfirmed) {
        const newParcel = {
          ...formData,
          cost,
          created_by: user.email,
          payment_status: 'unpaid',
          delivery_status: 'not_collected',
          creation_date: new Date().toISOString(),
          tracking_Id: trackingId,
        };
        console.log('Saved Parcel:', newParcel);
        reset();

        // save data to db
        axiosSecure.post('/parcels', newParcel)
          .then(res => {
            console.log(res.data);
            if (res.data.insertedId) {
              // TODO : redirect to payment page
              Swal.fire({
                position: "center",
                icon: "success",
                text: 'Proceeding to payment gateway.',
                title: "Redirecting...",
                showConfirmButton: false,
                timer: 1500
              });
            }
          })
      }
    });
  };

  const getRegions = () => [...new Set(data.map(item => item.region))];

  const getServiceCenters = (region) => {
    return data.filter(item => item.region === region).map(item => item.district);
  };

  const isNonDocument = watch('type') === 'non-document';

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Send Your Parcel</h1>
      <p className="text-center text-gray-500 mb-6">Fill in the form below to submit your parcel request.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="border p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Parcel Info</h2>
          <div className="flex gap-4">
            <label className="font-medium">Type:</label>
            <label><input type="radio" value="document" {...register('type', { required: 'Parcel type is required' })} /> Document</label>
            <label><input type="radio" value="non-document" {...register('type', { required: 'Parcel type is required' })} /> Non-Document</label>
          </div>
          {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}

          <div className="mt-4">
            <label className="block font-medium mb-1">Parcel Title</label>
            <input type="text" {...register('title', { required: 'Parcel title is required' })} className="input input-bordered w-full" placeholder='Parcel Name' />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {isNonDocument && (
            <div className="mt-4">
              <label className="block font-medium mb-1">Parcel Weight (kg)</label>
              <input type="number" step="0.1" {...register('weight', { required: 'Parcel weight is required for non-documents' })} className="input input-bordered w-full" placeholder='Parcel Weight' />
              {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Sender Info</h2>
            <label className="block font-medium mb-1">Sender Name</label>
            <input type="text" {...register('senderName', { required: 'Sender name is required' })} className="input input-bordered w-full" placeholder='Sender Name' />
            {errors.senderName && <p className="text-red-500 text-sm mt-1">{errors.senderName.message}</p>}

            <label className="block font-medium mb-1 mt-3">Sender Contact No</label>
            <input type="text" {...register('senderContact', { required: 'Sender contact is required' })} className="input input-bordered w-full" placeholder='Sender Contact No' />
            {errors.senderContact && <p className="text-red-500 text-sm mt-1">{errors.senderContact.message}</p>}

            <label className="block font-medium mb-1 mt-3">Select Region</label>
            <select {...register('pickupRegion', { required: 'Pickup region is required' })} className="select select-bordered w-full" onChange={(e) => setSelectedPickupRegion(e.target.value)}>
              <option value="">Select Region</option>
              {getRegions().map(region => <option key={region} value={region}>{region}</option>)}
            </select>
            {errors.pickupRegion && <p className="text-red-500 text-sm mt-1">{errors.pickupRegion.message}</p>}

            <label className="block font-medium mb-1 mt-3">Select Service Center</label>
            <select {...register('pickupServiceCenter', { required: 'Pickup service center is required' })} className="select select-bordered w-full">
              <option value="">Select District</option>
              {getServiceCenters(selectedPickupRegion).map(center => <option key={center} value={center}>{center}</option>)}
            </select>
            {errors.pickupServiceCenter && <p className="text-red-500 text-sm mt-1">{errors.pickupServiceCenter.message}</p>}

            <label className="block font-medium mb-1 mt-3">Address</label>
            <input type="text" {...register('pickupAddress', { required: 'Pickup address is required' })} className="input input-bordered w-full" />
            {errors.pickupAddress && <p className="text-red-500 text-sm mt-1">{errors.pickupAddress.message}</p>}

            <label className="block font-medium mb-1 mt-3">Pickup Instruction</label>
            <textarea {...register('pickupInstruction', { required: 'Pickup instruction is required' })} className="textarea textarea-bordered w-full"></textarea>
            {errors.pickupInstruction && <p className="text-red-500 text-sm mt-1">{errors.pickupInstruction.message}</p>}
          </div>

          <div className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Receiver Info</h2>
            <label className="block font-medium mb-1">Name</label>
            <input type="text" {...register('receiverName', { required: 'Receiver name is required' })} className="input input-bordered w-full" />
            {errors.receiverName && <p className="text-red-500 text-sm mt-1">{errors.receiverName.message}</p>}

            <label className="block font-medium mb-1 mt-3">Contact</label>
            <input type="text" {...register('receiverContact', { required: 'Receiver contact is required' })} className="input input-bordered w-full" />
            {errors.receiverContact && <p className="text-red-500 text-sm mt-1">{errors.receiverContact.message}</p>}

            <label className="block font-medium mb-1 mt-3">Select Region</label>
            <select {...register('deliveryRegion', { required: 'Delivery region is required' })} className="select select-bordered w-full" onChange={(e) => setSelectedDeliveryRegion(e.target.value)}>
              <option value="">Select Region</option>
              {getRegions().map(region => <option key={region} value={region}>{region}</option>)}
            </select>
            {errors.deliveryRegion && <p className="text-red-500 text-sm mt-1">{errors.deliveryRegion.message}</p>}

            <label className="block font-medium mb-1 mt-3">Select Service Center</label>
            <select {...register('deliveryServiceCenter', { required: 'Delivery service center is required' })} className="select select-bordered w-full">
              <option value="">Select District</option>
              {getServiceCenters(selectedDeliveryRegion).map(center => <option key={center} value={center}>{center}</option>)}
            </select>
            {errors.deliveryServiceCenter && <p className="text-red-500 text-sm mt-1">{errors.deliveryServiceCenter.message}</p>}

            <label className="block font-medium mb-1 mt-3">Address</label>
            <input type="text" {...register('deliveryAddress', { required: 'Delivery address is required' })} className="input input-bordered w-full" />
            {errors.deliveryAddress && <p className="text-red-500 text-sm mt-1">{errors.deliveryAddress.message}</p>}

            <label className="block font-medium mb-1 mt-3">Delivery Instruction</label>
            <textarea {...register('deliveryInstruction', { required: 'Delivery instruction is required' })} className="textarea textarea-bordered w-full"></textarea>
            {errors.deliveryInstruction && <p className="text-red-500 text-sm mt-1">{errors.deliveryInstruction.message}</p>}
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn bg-[#CAEB66] text-black hover:bg-lime-400 mt-4">Submit Parcel</button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
