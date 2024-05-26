import { useContext, useEffect, useRef, useState } from 'react'
import ChatOnlineC from '../../components/chatOnline/ChatOnlineC'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import './messanger.css'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

const Messanger = () => {
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const {user} = useContext(AuthContext)
    const scrollRef = useRef()

    // console.log(user);



    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get('/api/conversations/' + user._id)
                setConversations(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getConversations()
    }, [user._id])

    
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get('/api/messages/' + currentChat?._id)
                setMessages(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getMessages()
    }, [currentChat])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }

        const receiverId = currentChat.members.find((member) => member !== user._id)

        try {
            const res = await axios.post('/api/messages', message)
            setMessages([...messages, res.data])
            setNewMessage('')
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])
    
  return (
    <>
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input type="text" placeholder='Search for vendors' className='chatMenuInput'/>
                    {conversations.map((c) => (
                        <div onClick={()=>setCurrentChat(c)} key={c._id}>
                            <Conversation conversation={c} currentUser={user}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {
                        currentChat ? 
                    <>

                    <div className="chatBoxTop">
                        {messages.map((m) => (
                            <div key={m._id} ref={scrollRef}>

                                <Message message={m} own={m.sender === user._id}/>
                            </div>
                        ))}
                    </div>
                    <div className="chatBoxBottom">
                        <textarea placeholder='Write here' onChange={(e)=>setNewMessage(e.target.value)} value={newMessage} className='chatMessageInput' name="" id=""></textarea>
                        <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
                    </div>
                        </> : <span className='noConversation'>Open a conversation to start a chat</span>
                    }
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnlineC/>
                </div>
            </div>
        </div>
    </>
  )
}

export default Messanger