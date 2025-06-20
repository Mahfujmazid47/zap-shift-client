import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from '../Services/Services';
import ClientMarquee from '../ClientMarquee/ClientMarquee';
import FeatureHighlights from '../FeatureHighlights/FeatureHighlights';
import BeMerchant from '../BeMerchant/BeMerchant';

const Home = () => {
    return (
        <div>
            <main className='my-5'
                data-aos="zoom-in"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="1000">
                <Banner></Banner>
            </main>

            <section>
                <OurServices></OurServices>
            </section>

            <section>
                <ClientMarquee></ClientMarquee>
            </section>

            <section>
                <FeatureHighlights></FeatureHighlights>
            </section>

            <section>
                <BeMerchant></BeMerchant>
            </section>

        </div>
    );
};

export default Home;