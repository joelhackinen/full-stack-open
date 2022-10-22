import { useSelector, useDispatch } from 'react-redux'
import { addLike, deleteBlog } from '../reducers/blogsReducer'
import { useNavigate } from 'react-router-dom'

const BlogPage = ({ blog }) => {
  if (!blog) {
    return null
  }

  const navigate = useNavigate()
  const currentUser = useSelector(state => state.user)
  const dispatch = useDispatch()
  const { id, title, author, url, user, likes } = blog

  const handleDelete = () => {
    if (window.confirm(`Remove ${title} by ${author}?`)) {
      dispatch(deleteBlog(id))
    }
    navigate('/')
  }

  const handleLike = () => {
    dispatch(addLike(blog))
  }

  return (
    <div>
      <div>
        <h3>{title} by {author}</h3>
      </div>
      <div>
        <a href={url}>{url}</a>
      </div>
      <div>
        {likes} likes <button onClick={handleLike}>like</button>
      </div>
      <div>
        added by {user.name}
      </div>
      <div>
        {user.id === currentUser.id
          ? <button onClick={handleDelete}>remove</button>
          : null}
      </div>
    </div>
  )
}

export default BlogPage