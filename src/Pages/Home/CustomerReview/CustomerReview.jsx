import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import img from '../../../assets/customer-top.png';
import quote from '../../../assets/reviewQuote.png';
import avatar from '../../../assets/image-upload-icon.png';

const reviews = [
  {
    id: 1,
    text: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
    name: 'Awlad Hossin',
    title: 'Senior Product Designer',
    avatar: avatar,
  },
  {
    id: 2,
    text: 'Great service! The delivery was super fast and my product arrived in perfect condition.',
    name: 'Sarah Rahman',
    title: 'E-commerce Manager',
    avatar: avatar,
  },
  {
    id: 3,
    text: 'Highly recommend their logistic system. Everything was smooth and on time.',
    name: 'Tanvir Ahmed',
    title: 'Logistics Coordinator',
    avatar: avatar,
  },
];

const CustomerReview = () => {
    return (
        <div className='py-5 md:py-10'>
            <figure className='flex justify-center items-center mb-8'>
                <img src={img} alt="" />
            </figure>

            <div className='text-center space-y-2'>
                <h1 className='text-2xl md:text-3xl text-secondary font-bold'>What our customers are sayings</h1>
                <p className='text-sm text-gray-500 md:w-2/4 mx-auto'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            </div>

            <div className="relative my-10">
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="max-w-lg mx-auto bg-white shadow p-6 rounded space-y-4 my-5">
                <img src={quote} alt="quote" className="w-6" />
                <p className="text-sm text-gray-400 border-b-2 border-dashed border-gray-400 pb-2">
                  {review.text}
                </p>
                <div className="flex items-center gap-3">
                  <img src={review.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                  <div>
                    <h1 className="font-bold">{review.name}</h1>
                    <p className="text-sm text-gray-400">{review.title}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Navigation Buttons */}
          <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 text-xl text-gray-600 cursor-pointer z-10">
            <FaArrowLeft />
          </div>
          <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 text-xl text-gray-600 cursor-pointer z-10">
            <FaArrowRight />
          </div>
        </Swiper>
      </div>

            {/* <div>
                <img src={quote} alt="" />
                <p className='text-sm text-gray-400 border-b-2 border-dashed border-gray-400'>A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. </p>
                <div className='flex items-center gap-3'>
                    <img src={avatar} alt="" />
                    <div>
                        <h1 className='font-bold'>Awlad Hossin</h1>
                        <p className='text-sm text-gray-400'>Senior Product Designer</p>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default CustomerReview;