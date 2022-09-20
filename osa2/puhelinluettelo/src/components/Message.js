const Message = ({ msg, colour }) => {
  if (msg === '')
    return null

  const messageStyle = {
    color: colour,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={messageStyle}>
      {msg}
    </div>
  )
}

export default Message