import { Link } from 'react-router-dom'


const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h5>added blogs</h5>
      <div>
        {user.blogs.map(blog =>
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        )}
      </div>
    </div>
  )
}


export default User