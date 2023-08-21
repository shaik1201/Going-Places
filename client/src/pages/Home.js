import React from 'react';
import img1 from '../assets/road.jpg'
import img2 from '../assets/fruits.jpg'
import img3 from '../assets/tree.jpg'
import Navbar from '../Navbar';


function Home() {

    return (
        <div>
            <Navbar />

            <div className="head">
                <div className='inImageText'>
                    <p className='go'>Going Places <p className='places'>I haven’t been everywhere, but it’s on my list</p></p>
                </div>
            </div>
            <div className="welcome">
                <p className="welcome-text">
                    Welcome to our vibrant travel community! 🌍✈️ Embark on a journey of
                    exploration and connection with fellow travel enthusiasts from across the
                    globe. Delve into an eclectic array of captivating travel narratives,
                    adorned with breathtaking visuals, insightful recommendations, and
                    first-hand experiences that will ignite your wanderlust. Whether you're
                    in search of hidden gems, crafting your next itinerary, or simply
                    daydreaming about new horizons, our platform offers a sanctuary for
                    wanderers to share and celebrate their travel tales. Uncover uncharted
                    destinations, unravel travel mysteries, and forge bonds with kindred
                    spirits who share your fervor for the world's marvels. Embark on your
                    journey of discovery today and let the adventures unfold!
                </p>
            </div>


            <div className="images">
                <img className='image' src={img1} />
                <img className='image' src={img2} />
                <img className='image' src={img3} />
            </div>


        </div>
    )
}


export default Home;
