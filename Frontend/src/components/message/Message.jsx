import './message.css'

const Message = ({own}) => {
  return (
    <div className={own ? 'message own' : 'message'}>
        <div className="messageTop">
            <p className='messageText'>Hello</p>
        </div>
        <div className="messageBottom">
            1 hour ago
        </div>
    </div>
  )
}

export default Message