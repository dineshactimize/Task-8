import * as types from './actionsTypes'

export const deleteProductDataStart=()=>{
    return{
        type:types.DELETE_PRODUCT_DATA_START,
}
}
export const deleteProductDataSuccess=(data)=>{
    console.log("this is delete employee reducer call---->")
    return{
        type:types.DELETE_PRODUCT_DATA_SUCCESS,
        payload:data
    }
}
export const deleteProductDataError=(error)=>{
    return{
        type:types.DELETE_PRODUCT_DATA_ERROR,
        payload:error
    }
}
export const deleteProductDataActionInitiate = () => {
  return async function (dispatch) {
    dispatch(deleteProductDataStart());
   
    try {
      const res = await deleteProductApi();
      dispatch(deleteProductDataSuccess(res.data.data));
    } catch (error) {
      console.error("deleteHomeScreenDataError error", error);
      dispatch(deleteProductDataError(error.message));
    }
  };
};