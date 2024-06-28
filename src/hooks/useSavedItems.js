import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, auth } from "../Firebase";
import {useDispatch, useSelector} from "react-redux";
import {
    addSnackbar,
    allowCreateItem,
    preventCreateItem, removeSnackbar,
    updateMessageSnackbar
} from "../state/snackbar/snackbarSlice.js";

export default function useSavedItems() {
    const dispatch = useDispatch();
    const currentItem = useSelector(state => state.item.currentItem);
    const showSnackbar = useSelector(state => state.snackbar.showSnackbar);
    const canCreateItem = useSelector(state => state.snackbar.canCreateItem);


    useEffect(() => {
        if (showSnackbar) {
            setTimeout(() => {
                dispatch(removeSnackbar());
            }, 2000);
        }
    }, [dispatch, showSnackbar]);
    const [items, setItems] = useState([]);
    const itemsCollectionRef = collection(db, "saved_items");

    const createItem = async () => {
        if (!canCreateItem) {
          dispatch(updateMessageSnackbar({error: 1, message: "Please wait before creating another item." }));
          dispatch(addSnackbar());
          return;
        }

        if(!auth.currentUser.displayName) {
          dispatch(updateMessageSnackbar({error: 1, message: "Anonymous users can't create item." }));
          dispatch(addSnackbar());
          return;
        }
    
        try {
          await addDoc(itemsCollectionRef, {
            ...currentItem,
            author_uid: auth.currentUser.uid,
            author_name: auth.currentUser.displayName,
            author_photoURL: auth.currentUser.photoURL,
          });
          dispatch(updateMessageSnackbar({error: 0, message: "Item successfully created!" }));
          dispatch(addSnackbar());
    
          dispatch(preventCreateItem());
          setTimeout(() => {
            dispatch(allowCreateItem());
          }, 15000);
        } catch (error) {
            console.log(error);
          dispatch(updateMessageSnackbar({error: 1, message: "Error creating item. Please try again." }));
          dispatch(addSnackbar());
        }
      };

    const deleteItem = async (id) => {
        const itemDoc = doc(db, "saved_items", id);
        await deleteDoc(itemDoc);
        dispatch(updateMessageSnackbar({error: 0, message: "Item successfully deleted!" }));
        dispatch(addSnackbar());
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    useEffect(() => {
        const getItems = () => {
            const q = query(itemsCollectionRef, orderBy('bonus_1', 'desc'));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const updatedItems = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setItems(updatedItems);
            });
    
            return unsubscribe;
        };
    
        return getItems();
    }, [itemsCollectionRef]);

    return { items, createItem, deleteItem }
}