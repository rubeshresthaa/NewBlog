import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import appWriteService from "../../appwrite/dataConfig";
import PostForm from "./PostForm";
import Container from "../container/Container";


const EditPost = () => {
  const[post,setPost]=useState([]);
  const {slug}=useParams()
  const nav=useNavigate()

  useEffect(()=>{
    if(slug){
      appWriteService.getDatabase(slug).then((post)=>{
        setPost(post)
      })
    }else{
      nav("/")
    }
   
  },[slug,nav])
  return post ? (<div className="py-8">
    <Container>
    <PostForm post={post} />
    </Container>
      
  </div>) : null;
}
export default EditPost