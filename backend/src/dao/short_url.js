import shortUrl from "../models/short_url.model.js";
import urlSchema from "../models/short_url.model.js"

export const saveShortUrl = async (shortUrl,url,userId)=>{
    const newUrl = new urlSchema({
      full_url: url,
      short_url: shortUrl,
    });
    if(userId){
        newUrl.userId = userId
    }

    newUrl.save();
}
export const getShortUrl = async (shortUrl)=>{
    return await urlSchema.findOneAndUpdate({short_url:shortUrl},{$inc:{clicks:1}})
}