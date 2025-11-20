import API from "../../api/CommonApi";
const api = new API();
const endPoints = "/products";
export const fetchProductData = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is get call in API---->", endPoints);
      const response = await api.get(`${endPoints}.json`);
      console.log("fetched data", response);
      if (response && response.data) {
        const fetchedData = Object.keys(response.data).map(key => ({
          id: key,
          ...response.data[key]
        }));
        resolve(fetchedData);
        console.log("fetchedData",fetchedData)
        return(fetchedData)
      } else {
        resolve([]); 
      }
    } catch (error) {
      console.error("Error in fetchProductData:", error);
      reject(error);
    }
  });
};