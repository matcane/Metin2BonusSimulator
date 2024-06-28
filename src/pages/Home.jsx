import Header from "../components/Header";
import Enchanting from "../views/Enchanting";
import { useState } from "react";
import Ranking from "../views/Ranking";
import useSavedItems from "../hooks/useSavedItems";

export default function Home() {
    const [view, setView] = useState(Number(window.localStorage.getItem('view') || 1));
    const { items, deleteItem, createItem } = useSavedItems();
    return(
        <>
        <div className="flex flex-col pb-4 pt-4 justify-center items-center w-screen h-screen bg-bg bg-cover">
            <Header view={view} switchView={setView}/>
            {view === 1 && <Enchanting createItem={createItem} />}
            {view === 0 && <Ranking items={items} deleteItem={deleteItem} />}
        </div>
        </>
    )
}