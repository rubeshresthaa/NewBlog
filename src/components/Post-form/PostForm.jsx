import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/dataConfig"
import Button from "../Headers/Button";
import Input from "../Headers/Input";
import Select from "../Select";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RTE from "../RTE";


const PostForm = ({post}) => {
  const {register,watch,setValue,handleSubmit,control,getValues}=useForm({
    defaultValues:{
      title:post?.title || "",
      slug:post?.slug || "",
      content:post?.content || "",
      status:post?.status || "active"
    }
  })
  const nav=useNavigate();

  const userData=useSelector((state)=>state.auth.userData)
  
  const submit=async (data)=>{
    if(post){
     const file= data.image[0] ? authService.uploadFile(data.image[0]) :null;
    if(file){
      authService.deleteFile(post.featuredImage)
    }
    const dbPost=await authService.updateDatabase(post.$id,{
      ...data,
      featuredImage:file ? file.$id : undefined,

      if(dbPost){
        nav(`/post/${dbPost.$id}`)
      }
    })
    }else{
      const file= data.image[0] ? authService.uploadFile(data.image[0]) :null; 
      if(file){
        const fileId=file.$id
        data.featuredImage=fieldId
        const dbPost=await authService.createDatabase({
          ...data,
          userId:userData
        })
        if(dbPost){
          nav(`/post/${dbPost.$id}`)
        }

      }
    }
  }

 const slugTransform =useCallback((value)=>{
  if(value && typeof value ==="string"){
    return value.trim().toLowerCase().replace(/^[a-zA-Z\d\s]+/g,"-")
  }
  return ""
 },[])

 useEffect(()=>{
  const subscription=watch((value,{name})=>{
    if(name==="title"){
      setValue("slug",slugTransform(value.title,{
        shouldValidate:true
      }))
    }
    return ()=>{
      subscription.unsubscribe()
    }
  })
 },[watch,slugTransform,setValue])
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
      <Input 
      label="Title:"
      placeholder="Enter Title"
      className="mb-4"
      {...register("title",{
        required:true
      })}
      />
      <Input
      label="Slug:"
      placehold="Enter Slug"
      className="mb-4"
      {...register("slug",{required:true})}
      onInput={(e)=>{
        setValue("slug",slugTransform(e.currentTarget.value),{shouldValidate:true})

      }}
       />
       <RTE 
       label="Content:"
       name="content"
       control={control}
       defaultValue={getValues("content")}
       />
      </div>
      <div className="w-1/2 px-2">
      <Input
      label="Add Image"
      type="file"
      className="mb-4"
      accept="image/png,image/jpg,image/jpeg,image/gif"
      {...register("image",{required:!post})}
      />
      {post && (
        <div className="w-full mb-4">
          <img src={authService.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-xl" />
        </div>
      )}
      <Select
      options={["active","inactive"]}
      label="Status:"
      className="mb-4"
      {...register("status",{required:true})}
      />
  <Button type="submit"
  bgColor={post ? "bg-green-500" :undefined}
  className="w-full">
    {post ?"Update" :"Submit"}
  </Button>
  
  

      </div>
    </form>
  )
}
export default PostForm