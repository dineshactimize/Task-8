import { putProductApi } from '../api/updateProductApi';
import * as types from './actionsTypes'


export const putProductDataStart=()=>{
    return{
        type:types.UPDATE_PRODUCT_DATA_START
    }   
};

export const putProductDataSuccess=(data)=>{
    console.log("this is putdatasuccessaction---->",data)
    return{
        type:types.UPDATE_PRODUCT_DATA_SUCCESS,
        payload:data
    }
};

export const putProductDataError=(error)=>{
    console.log("this is putdataerrorsaction---->")
    return{
        type:types.UPDATE_PRODUCT_DATA_ERROR,
        payload:error
    }
}
export const putProductDataActionInitiate = () => {
  return async function (dispatch) {
    dispatch(putProductDataStart());
   
    try {
      const res = await putProductApi();
      dispatch(putProductDataSuccess(res.data.data));
    } catch (error) {
      console.error("putHomeScreenDataError error", error);
      dispatch(putProductDataError(error.message));
    }
  };
};