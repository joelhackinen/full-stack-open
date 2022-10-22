import { useField } from '../hooks'
import { useRef } from 'react'
import { createBlog } from '../reducers/blogsReducer'
import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'

const BlogForm = () => {
  const { id, name, username } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const createFormRef = useRef()
  const { reset: resetTitle, ...title } = useField('title', 'text')
  const { reset: resetAuthor, ...author } = useField('author', 'text')
  const { reset: resetUrl, ...url } = useField('url', 'text')

  const handleCreate = (event) => {
    event.preventDefault()
    dispatch(createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
      user: {
        id,
        name,
        username
      }
    }))
    createFormRef.current.toggleVisibility()
    resetFields()
  }

  const resetFields = () => {
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return (
    <div>
      <Togglable showText='create' hideText='cancel' ref={createFormRef}>
        <div className="formDiv">
          <h3>create new</h3>
          <form onSubmit={handleCreate}>
            <div>
              <input
                placeholder="title here"
                { ...title }
              />
            </div>
            <div>
              <input
                placeholder="author here"
                { ...author }
              />
            </div>
            <div>
              <input
                placeholder="url here"
                { ...url }
              />
            </div>
            <button id="create-button" type="submit">create</button>
            <button type="button" onClick={resetFields}>reset</button>
          </form>
        </div>
      </Togglable>
    </div>
  )
}

export default BlogForm