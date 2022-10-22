import { useDispatch, useSelector } from 'react-redux'
import { addLike, deleteBlog } from '../reducers/blogsReducer'
import Togglable from './Togglable'

const Blog = ({ blog }) => {
  const { title, url, user, likes, author, id } = blog
  const dispatch = useDispatch()
  const { id: userId } = useSelector(state => state.user)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    borderRadius: 4,
    marginBottom: 5
  }

  const handleDelete = () => {
    if (window.confirm(`Remove ${title} by ${author}?`)) {
      dispatch(deleteBlog(id))
    }
  }

  const handleLike = () => {
    dispatch(addLike(blog))
  }

  return (
    <div className="blog" style={blogStyle}>
      {title} by {author}
      <Togglable showText='view' hideText='hide'>
        url: {url}<br/>
        likes: {likes}<button onClick={handleLike}>like</button><br/>
        adder: {user.username}<br/>
        {userId === user.id
          ? <div><button onClick={handleDelete}>remove</button><br/></div>
          : null}
      </Togglable>
    </div>
  )
}

export default Blog