import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './home.css'
import HomeCard from '../../components/HomeCard/HomeCard'
import homeCardImage from '../../assets/guestList.svg'
import budgetPlanner from   '../../assets/budgetPlanner.svg'
import calander from '../../assets/calander.svg'
import photoAlbum from '../../assets/PhotoAlbum.svg'
import seatingVisualizer from '../../assets/seatingPlan.svg'
import AboutUs from '../../components/aboutUs/AboutUs'
import homeBg from '../../assets/homeBg.svg'

const Home = () => {

    const data = [
        {
            id: 1,
            title: "Guest & Vendor Management",
            description: "All you'll need to create a comprehensive wedding guest list, including dietary requirements, preferences & even RSVPs.",
            image: homeCardImage,
            bgColor: "#C3A8E1"
        },
        {
            id: 2,
            title: "Budget Tracker",
            description: "Track your budget, expenses, and payments all in one place. Get notified when you're close to your budget limit.",
            image: budgetPlanner,
            bgColor: "#E09BAC"
        },
        {
            id: 3,
            title: "Event Calander",
            description: "Set up events and manage your schedule with ease. Receive timely notifications for upcoming events to ensure seamless planning.",
            image: calander,
            bgColor: "#FEC983"
        },
        {
            id: 4,
            title: "Gift Registry",
            description: "Hosts create gift registry, guests select desired gifts. Simplify gifting process, ensuring hosts receive items they truly desire.",
            image: photoAlbum,
            bgColor: "#E09BAC"
        }
        ,{
            id: 5,
            title: "Seating Visualizer",
            description: "Effortlessly plan seating with our innovative chart maker. Simplify your task with easy drag-and-drop functionality.",
            image: seatingVisualizer,
            bgColor: "#C3DD74"
        }
        ,{
            id: 6,
            title: "Messenger",
            description: "Chat with vendors and guests in real-time. Share photos, videos, and documents with ease.",
            image: photoAlbum,
            bgColor: "#E09BAC"
        }
    ]

    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    console.log(user)

    const handleClick = (e) => {
        e.preventDefault()
        navigate('/messenger')
    }
    return (
    <>
        <div className="homeCover">
        <div className="HomeHeroCover">
            <div className="HomeHero">
                <div className="HomeHeroHeading">Plan Your Perfect Event With Ease</div>
                <div className="HomeHeroSubHeading">Streamline your event planning process with our all-in-one platform. Organize, coordinate, and connect with vendors effortlessly for an unforgettable experience.</div>
                <button className='HomeButtonSP'>Start Planning</button>
            </div>
        </div>
            <div className="homeSubSection1">
                <div className="HomeSubsectionHeading">Simplify Your Event Planning with These Unique Tools</div>
                <div className="HomeCardCover">
                    <HomeCard data={data} /> 
                </div>
            </div>
            <div className="heroSubSection3">
                <div className="HomeSubsectionHeading">Streamline Your Event with Vendor Collaboration</div>
                <div className="heroSubSection3SubHeading">Hosts can now invite and onboard vendors directly through our platform, allowing them to view event plans and ensure seamless coordination. By bringing everything together in one place, you enable your vendors to align perfectly with your vision. Vendors can view the detailed plans, making it easier to deliver top-notch services and contribute to a flawless event.</div>
                <button className='HomeButtonSC' >Onboard Vendors</button>
            </div>
            <div className="homeSubSection2">
                <AboutUs/>
            </div>
        </div>
    </>
  )
}

export default Home