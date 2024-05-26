import ChatOnlineC from '../../components/chatOnline/ChatOnlineC'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import './messanger.css'

const Messanger = () => {
  return (
    <>
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input type="text" placeholder='Search for vendors' className='chatMenuInput'/>
                    <Conversation/> 
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        <Message/>
                        <Message own={true}/>
                        <Message/>
                    </div>
                    <div className="chatBoxBottom">
                        <textarea placeholder='Write here' className='chatMessageInput' name="" id=""></textarea>
                        <button className='chatSubmitButton'>Send</button>
                    </div>
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