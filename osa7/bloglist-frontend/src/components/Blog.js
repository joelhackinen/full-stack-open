import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const { title, author, id } = blog

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    borderRadius: 4,
    marginBottom: 5
  }

  return (
    <div className="blog" style={blogStyle}>
      <Link to={`/blogs/${id}`}>{title}</Link> by {author}
    </div>
  )
}

export default Blog