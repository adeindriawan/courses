export const baseURL = process.env.NODE_ENV == "development" ? "http://academy.beta/" : "https://academy.itsteknosains.co.id/"
export const APIURL = process.env.NODE_ENV == "development" ? baseURL + "api/" : baseURL + "api/"