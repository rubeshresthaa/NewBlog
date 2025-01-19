// const conf={
// appwriteURL:String(import.meta.env.VITE_APPWRITE_URL),
// appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
// appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
// appwriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
// appwriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID)

// }

const conf = {
  appwriteURL: import.meta.env.VITE_APPWRITE_URL,
  appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  appwriteCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
  appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
};
console.log("Appwrite URL:", conf.appwriteURL);
console.log("Configuration:", conf);


export default conf;