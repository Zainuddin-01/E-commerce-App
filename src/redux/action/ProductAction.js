import { firestore } from '../../firebase/firebaseConfig';
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { ADD_PRODUCT,
         UPDATE_PRODUCT,
         DELETE_PRODUCT,
         SET_PRODUCTS
 } from './Type';

// Add product
export const addProduct = (product) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(firestore, 'products'), product);

    dispatch({
      type: ADD_PRODUCT,
      payload: { ...product, id: docRef.id },
    });
  } catch (error) {
    console.error('Error adding product:', error.message);
  }
};

// Update product
export const updateProduct = (product) => async (dispatch) => {
  try {
    await updateDoc(doc(firestore, 'products', product.id), product);

    dispatch({
      type: UPDATE_PRODUCT,
      payload: product,
    });
  } catch (error) {
    console.error('Error updating product:', error.message);
  }
};

// Delete product
export const deleteProduct = (productId) => async (dispatch) => {
  try {
    console.log("Attempting to delete:", productId); // ✅
    await deleteDoc(doc(firestore, 'products', productId));

    dispatch({
      type: DELETE_PRODUCT,
      payload: productId,
    });
  } catch (error) {
    console.error('Error deleting product:', error.message); // ✅
  }
};


// Load all products on app start
export const fetchProducts = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'products'));
    const productList = [];

    querySnapshot.forEach((doc) => {
      productList.push({ ...doc.data(), id: doc.id });
    });

    dispatch({
      type: SET_PRODUCTS,
      payload: productList,
    });
  } catch (error) {
    console.error('Error fetching products:', error.message);
  }
};
