import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h3>blogs</h3>
      {sortedBlogs.map(b =>
        <Blog key={b.id} blog={b} />
      )}
    </div>
  )
}

export default Blogs