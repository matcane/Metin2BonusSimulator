import { useEffect, useState } from "react";
import useSnackbar from "./useSnackbar";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, auth } from "../Firebase";
import useShuffle from "./useShuffle";

export default function useSavedItems() {

    const { currentItem, shuffle } = useShuffle();
    const { showSnackbar, setShowSnackbar, messageSnackbar, setMessageSnackbar, canCreateItem, setCanCreateItem } = useSnackbar();
    const [items, setItems] = useState([]);
    const itemsCollectionRef = collection(db, "saved_items");

    const createItem = async () => {
        if (!canCreateItem) {
          setMessageSnackbar(() => ({error: 1, message: "Please wait before creating another item." }));
          setShowSnackbar(true);
          return;
        }

        if(!auth.currentUser.displayName) {
          setMessageSnackbar(() => ({error: 1, message: "Anonymous users can't create item." }));
          setShowSnackbar(true);
          return;
        }
    
        try {
          await addDoc(itemsCollectionRef, {
            ...currentItem,
            author_uid: auth.currentUser.uid,
            author_name: auth.currentUser.displayName,
            author_photoURL: auth.currentUser.photoURL,
          });
          setMessageSnackbar(() => ({error: 0, message: "Item successfully created!" }));
          setShowSnackbar(true);
    
          setCanCreateItem(false);
          setTimeout(() => {
            setCanCreateItem(true);
          }, 15000);
        } catch (error) {
            console.log(error);
          setMessageSnackbar(() => ({error: 1, message: "Error creating item. Please try again." }));
          setShowSnackbar(true);
        }
      };

    const deleteItem = async (id) => {
        const itemDoc = doc(db, "saved_items", id);
        await deleteDoc(itemDoc);
        setMessageSnackbar(() => ({error: 0, message: "Item successfully deleted!" }));
        setShowSnackbar(true);
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
    }, []);

    return { showSnackbar, messageSnackbar, canCreateItem, items, currentItem, shuffle, createItem, deleteItem }
}