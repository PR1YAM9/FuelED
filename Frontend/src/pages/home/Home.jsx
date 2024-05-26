import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    console.log(user)

    const handleClick = (e) => {
        e.preventDefault()
        navigate('/messenger')
    }
    return (
    <>
        <button onClick={handleClick}>go to messanger</button>
    </>
  )
}

export default Home