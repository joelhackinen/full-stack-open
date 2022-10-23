import { useSelector, useDispatch } from 'react-redux'
import { addLike, deleteBlog, addComment } from '../reducers/blogsReducer'
import { useNavigate } from 'react-router-dom'
import { Button, Badge } from 'react-bootstrap'
import CommentForm from './CommentForm'
import { setSuccessMessage } from '../reducers/notificationReducer'

const BlogPage = ({ blog }) => {
  const navigate = useNavigate()
  const currentUser = useSelector(state => state.user)
  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

  const { id, title, author, url, user, likes, comments } = blog

  const handleDelete = () => {
    if (window.confirm(`Remove ${title} by ${author}?`)) {
      dispatch(deleteBlog(id))
      navigate('/')
    }
  }

  const handleLike = () => {
    dispatch(addLike(blog))
  }

  const handleComment = (comment) => {
    dispatch(addComment(blog, comment))
  }

  return (
    <div>
      <div>
        <h3>
          {title} by {author}
          <Button onClick={handleLike} size="sm">
            Likes <Badge bg="secondary">{likes}</Badge>
          </Button>
        </h3>
      </div>
      <div>
        <a href={`//${url}`}>{url}</a>
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
      <div>
        <CommentForm commentHandler={handleComment} />
      </div>
      <div>
        <ul>
          {comments.map(c =>
            <li key={c}>{c}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default BlogPage