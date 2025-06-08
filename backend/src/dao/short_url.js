import shortUrl from "../models/short_url.model.js";
import urlSchema from "../models/short_url.model.js"
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (shortUrl,url,userId)=>{
   
   try{
     const newUrl = new urlSchema({
      full_url: url,
      short_url: shortUrl,
    });
    if(userId){
        newUrl.user_id = userId
    }


    await newUrl.save();
   }
   catch(err){
    if (err.code == 11000) {
      throw new ConflictError("Short URL already exists");
    }
    throw new Error(err);
   }
}
export const getShortUrl = async (shortUrl)=>{
    return await urlSchema.findOneAndUpdate({short_url:shortUrl},{$inc:{clicks:1}})
}