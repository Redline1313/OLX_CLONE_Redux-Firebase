import { doc, setDoc } from "@firebase/firestore";
import { db, storage } from "../../config/firebase";
import {
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
} from "../actionTypes/updateProductTypes";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const updateProduct = (productData, productId, newImage) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });

      if (newImage) {
        const imageRef = ref(storage, "products/" + newImage.name);
        await uploadBytes(imageRef, newImage);
        const newImageUrl = await getDownloadURL(imageRef);

        productData.imageUrl = newImageUrl;
      }

      const productRef = doc(db, "items", productId);
      await setDoc(productRef, productData);

      dispatch({ type: UPDATE_PRODUCT_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error.message });
    }
  };
};
