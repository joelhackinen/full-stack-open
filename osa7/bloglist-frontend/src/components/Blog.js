import { useSelector, useDispatch } from 'react-redux'
import { addLike, deleteBlog } from '../reducers/blogsReducer'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const BlogPage = ({ blog }) => {
  const navigate = useNavigate()
  const currentUser = useSelector(state => state.user)
  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

  const { id, title, author, url, user, likes } = blog

  const handleDelete = () => {
    if (window.confirm(`Remove ${title} by ${author}?`)) {
      dispatch(deleteBlog(id))
      navigate('/')
    }
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
        {likes} likes <Button variant="success" size="sm" onClick={handleLike}>like</Button>
      </div>
      <div>
        added by {user.name}
      </div>
      <div>
        {user.id === currentUser.id
          ? <Button variant="warning" onClick={handleDelete}>remove</Button>
          : null
        }
      </div>
    </div>
  )
}

export default BlogPage