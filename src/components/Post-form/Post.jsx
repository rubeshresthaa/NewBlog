import { Link, useNavigate, useParams } from "react-router-dom"
import appWriteService from '../../appwrite/dataConfig';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "../container/Container";
import Button from "../Headers/Button";

const Post = () => {
  const [post,setPost]=useState(null)
  const {slug}=useParams();
  const nav=useNavigate()
  const userData=useSelector((state)=>state.auth.userData)

  const isAdmin=post && userData ? post.$id===userData.$id : false

  useEffect(()=>{
    if(slug){
      appWriteService.getDatabase(slug).then((post)=>{
        if(post){
          setPost(post)
        }else{
          nav("/")
        }
      })
    }else{
      nav("/")
    }
   
  },[slug,nav])

  const deletePost=()=>{
    appWriteService.deleteDatabase(post.$id).then((status)=>{
      if(status){
        appWriteService.deleteFile(post.featuredImage)
        nav("/")
      }
    })
  }
  
  return post ? (
    <div className="py-8">
      <Container>
    <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
    <img src={appWriteService.getFilePreview(post.featuredImage)} alt={post.title}
    className="rounded-xl" />
     {isAdmin && (
      <div className="absolute right-6 top-6">
        <Link to={`/edit-post/${post.$id}`}>
        <Button bgcolor="bg-green-500" className="mr-3">
          Edit
        </Button>
        </Link>
        <Button onClick={deletePost} bgcolor="bg-red-500">
            Delete
        </Button>
      </div>
     )}
    </div>
    <div className="w-full mb-6">
      <h1 className="text-2xl font-semibold">
        {post.title}
      </h1>
    </div>
    <div className="browser-css">{parse({post.content})}</div>
      </Container>
    </div>
  ) : null 
}
export default Post