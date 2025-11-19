import API from "../../api/CommonApi";
const api = new API();
const endPoints = "/products/:id";

export const putProductApi = async (productdata, id) => {

    return new Promise(async (resolve, reject) => {
        try {
          console.log("this is put call in API---->");
          const response = await api.put(`${endPoints}/${id}`,productdata);

          console.log(" put response", response);
          if (response && response.data) {
           
            resolve(response);
            console.log("put response",response)
            return(response)
          } else {
            resolve([]); 
          }
        } catch (error) {
          console.error("Error in updateProductData:", error); 
          reject(error);
        }
      });
    };