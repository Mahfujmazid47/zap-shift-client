import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import img from '../../../assets/customer-top.png';
import quote from '../../../assets/reviewQuote.png';
import avatar from '../../../assets/image-upload-icon.png';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

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
  {
    id: 4,
    text: 'Customer support was very helpful and resolved my issue within minutes. Impressive!',
    name: 'Raisa Haque',
    title: 'Customer Service Lead',
    avatar: avatar,
  },
  {
    id: 5,
    text: 'User-friendly website and great tracking system. Made my shopping experience stress-free.',
    name: 'Mithila Chowdhury',
    title: 'UI/UX Designer',
    avatar: avatar,
  },
  {
    id: 6,
    text: 'Packaging was neat and secure. They really care about product safety during transit.',
    name: 'Farhan Kabir',
    title: 'Supply Chain Analyst',
    avatar: avatar,
  },
  {
    id: 7,
    text: 'I’ve been using their service for months and it’s always reliable and fast.',
    name: 'Nusrat Jahan',
    title: 'Operations Manager',
    avatar: avatar,
  },
  {
    id: 8,
    text: 'Excellent experience overall. The delivery tracking was accurate and updated regularly.',
    name: 'Hasibul Islam',
    title: 'Tech Entrepreneur',
    avatar: avatar,
  },
  {
    id: 9,
    text: 'Best logistic partner for eCommerce businesses in the country. Truly dependable.',
    name: 'Rakib Hasan',
    title: 'Online Store Owner',
    avatar: avatar,
  },
  {
    id: 10,
    text: 'Smooth process from order placement to delivery. Will definitely use again.',
    name: 'Lamia Akter',
    title: 'Freelancer',
    avatar: avatar,
  },
];

const CustomerReview = () => {
  return (
    <div className='py-5 md:py-10'>
      <figure className='flex justify-center items-center mb-8'>
        <img src={img} alt='' />
      </figure>

      <div className='text-center space-y-2'>
        <h1 className='text-2xl md:text-3xl text-secondary font-bold'>What our customers are sayings</h1>
        <p className='text-sm text-gray-500 md:w-2/4 mx-auto'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
      </div>

      <div className='relative md:my-24 my-10 max-w-7xl mx-auto px-4'>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          centeredSlides={true}
          autoplay={{ delay: 3000 }}
          navigation={{
            nextEl: '.custom-next-btn',
            prevEl: '.custom-prev-btn',
          }}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = '.custom-prev-btn';
            swiper.params.navigation.nextEl = '.custom-next-btn';
            swiper.navigation.init();
            swiper.navigation.update();

            swiper.params.pagination.el = '.custom-pagination';
            swiper.pagination.init();
            swiper.pagination.render();
            swiper.pagination.update();
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review, idx) => (
            <SwiperSlide key={idx}>
              {({ isActive }) => (
                <div
                  className={`transition-all duration-500 p-6 rounded-xl shadow-md h-full mx-auto max-w-md ${isActive ? 'bg-white scale-115 md:my-2 opacity-100' : 'bg-gray-100 md:my-15 scale-90 opacity-40'
                    }`}
                >
                  <img src={quote} alt='quote' className='mb-4 w-6' />
                  <p className='text-sm text-gray-600 border-b-2 border-dashed border-[#CAEB66] mb-4 pb-2'>{review.text}</p>
                  <div className='flex items-center gap-3'>
                    <img src={review.avatar} alt={review.name} className='w-10 h-10 rounded-full' />
                    <div>
                      <h1 className='font-bold text-black'>{review.name}</h1>
                      <p className='text-sm text-gray-400'>{review.title}</p>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}

          {/* Custom Pagination & Navigation */}
        </Swiper>

        <div className='flex items-center justify-center mt-6 gap-4  lg:px-96'>
          {/* Prev Button */}
          <button className='custom-prev-btn cursor-pointer bg-[#CAEB66] p-3 rounded-full text-black hover:bg-lime-400'>
            <FaArrowLeft />
          </button>

          {/* Pagination */}
          <div className='custom-pagination flex gap-1 md:gap-2 text-center items-center justify-center'></div>

          {/* Next Button */}
          <button className='custom-next-btn cursor-pointer bg-[#CAEB66] p-3 rounded-full text-black hover:bg-lime-400'>
            <FaArrowRight />
          </button>
        </div>

      </div>
    </div>
  );
};

export default CustomerReview;
