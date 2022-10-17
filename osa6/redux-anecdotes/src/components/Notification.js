import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  const { show, message } = notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div>
      {show ? <div style={style}>{message}</div> : null}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)