import { useEffect, useState } from "react";

export default function useSnackbar() {
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState({
      error: 0,
      message: "",
    });
    const [canCreateItem, setCanCreateItem] = useState(true);

    useEffect(() => {
        if (showSnackbar) {
          setTimeout(() => {
            setShowSnackbar(false);
          }, 2000);
        }
      }, [showSnackbar]);
    
      return { showSnackbar, setShowSnackbar, messageSnackbar, setMessageSnackbar, canCreateItem, setCanCreateItem }
}