import { Client,Databases,ID,Storage,Query } from "appwrite";
import conf from '../conf/conf';

export class DataConfig{
  client=new Client();
  databases;
  bucket;

  constructor(){
    this.client.setEndpoint(conf.appwriteURL).setProject(conf.appwriteProjectId)
    this.databases=new Databases(this.client);
    this.bucket=new Storage(this.client)
  }

  async createDatabase({title,content,slug,featuredImage,status,userId}){
    try {
      return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId,slug,{
        title,content,featuredImage,status,userId
      })
    } catch (error) {
      throw error;
    }
  }

  async updateDatabase(slug,{title,content,featuredImage,status,userId}){
    try {
      return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug,{
        title,content,featuredImage,status
      })
    } catch (error) {
      
    }
  }

  async deleteDatabase(slug){
    try {
       await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
       return true;
    } catch (error) {
      throw error;
      return false;
    }
  }

  async getDatabase(slug){
    try {
      return this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
    } catch (error) {
      throw error;
      return false;
    }
  }

  async getAllDatabase(queries=[Query.equal("status","active")]){
    try {
      return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId,queries)
    } catch (error) {
      throw error;
    }
  }

  //For File

  async uploadFile(file){
    
    try {
      return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file)
    } catch (error) {
      throw error;
      return false;
    }

  }

  async deleteFile(fileId){
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId)
    } catch (error) {
      throw error;
      return false
    }
  }

  getFilePreview(fileId){
    this.bucket.getFilePreview(conf.appwriteBucketId, fileId)
  }


}

const dataConfig=new DataConfig();
 

export default dataConfig;