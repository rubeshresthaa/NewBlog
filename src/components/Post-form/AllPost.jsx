import { useEffect, useState } from "react"
import appWriteService from "../../appwrite/dataConfig"
import PostCard from "../PostCard"
import Container from "../container/Container"


const AllPost = () => {
  const [posts,setPosts]=useState([])

  useEffect(()=>{
    appWriteService.getAllDatabase([]).then((posts)=>{
      if(posts){
        setPosts(posts.documents)
      }
    })
  },[posts])
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post)=>{
           <div key={post.$id} className="p-2 w-1/4">
            <PostCard post={post} />
           </div>
          })}
        </div>
      
      </Container>
      
    </div>
  )
}
export default AllPost