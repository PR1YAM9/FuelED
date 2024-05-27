import React from 'react'
import './AboutUs.css'
import bottomImg from '../../assets/flower-4865379_1280 4.svg'
const AboutUs = () => {
  return (
    <>
        <div className="aboutUsCover">
            <div className="aboutUsHeadingCover">
                <div className="ABheading">About Us</div>
                <div className="ABsubHeading">
                    <div className="ABsubHeading1">Our goal is to simplify your event planning by providing a comprehensive, user-friendly solution for organizers, vendors, and guests.</div>
                    <div className="ABsubHeading1">We aim to make planning enjoyable and stress-free, whether it's a wedding, birthday, or corporate event. Our platform offers everything you need, from budgeting and scheduling to seating arrangements and vendor coordination.</div>
                </div>
            </div>
            <div >
                <img className="ABbottomImg" src={bottomImg} alt="bottomImg" />
            </div>
        </div>
    </>
  )
}

export default AboutUs