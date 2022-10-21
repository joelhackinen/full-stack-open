import { useSelector } from 'react-redux'

const Message = () => {
  const { message, error } = useSelector(state => state.notification)
  if (message === null)
    return null

  const messageStyle = {
    color: error ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div className="message" style={messageStyle}>
      {message}
    </div>
  )
}

export default Message