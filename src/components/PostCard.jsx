import { Link } from 'react-router-dom'
import authService from '../appwrite/dataConfig'

const PostCard = ({$id,title,featuredImage}) => {
  return (
    <div>
      <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-200 rounded-lg p-4'>
        <div className='w-full'>
        <img src={authService.getFilePreview(featuredImage)} alt={title}  className='rounded-2xl'/>
        </div>
        <h2>{title}</h2>
      </div>
      </Link>
     
    </div>
  )
}
export default PostCard