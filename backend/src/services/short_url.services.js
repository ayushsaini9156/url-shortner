import {generateNanoID} from "../utils/helper.js"
import { saveShortUrl } from "../dao/short_url.js";
export const createShortUrlWithoutUser = async (url)=>{
    const shortUrl =await generateNanoID(7);
    if(!shortUrl) throw new Error("Short URL  not generated")
    await saveShortUrl(shortUrl, url);
    return shortUrl
}
export const createShortUrlWithUser = async (url,userId)=>{
   
    const shortUrl =await generateNanoID(7);
    await saveShortUrl(url,shortUrl,userId)
    return shortUrl
}