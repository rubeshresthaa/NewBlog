import { useEffect, useState } from "react";
import appWriteService from "../appwrite/dataConfig"
import Container from "./container/Container";
import PostCard from "./PostCard";
const Home = () => {
  const [posts,setPosts]=useState([]);

  useEffect(()=>{
    appWriteService.getAllDatabase([]).then((posts)=>{
     if(posts){
      setPosts(posts.documents)
     }
    })
  },[])
  if(posts===0){
    return(
      <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
        <h1 className="text-xl">
          Login to read posts
        </h1>
          </div>
        </div>
      </Container>
      </div>
    )
  }
  return (
    <div className="py-8 w-full">
      <Container>
      <div className="flex flex-wrap"> 
        {posts.map((post)=>(
          <div key={post.$id} className="p-2 w-1/4">
            <PostCard {...post} />
          </div>
        ))}
      </div>
      </Container>
    </div>
  )
}
export default Home