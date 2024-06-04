import { useTranslation } from "react-i18next";
import Item from "../components/Item";
import ItemStats from "../components/ItemStats";
import { auth } from "../Firebase";


export default function Ranking(props) {
    const { t } = useTranslation();
    const { items, deleteItem, showSnackbar, messageSnackbar } = props;

    return(
        <div className="flex flex-col pt-4 gap-6 justify-evenly items-center w-full h-full overflow-y-auto sm:flex-row sm:flex-wrap">
            {items.map((item) => {
                return (
                <div key={item.id} className="flex flex-col gap-y-2">
                    <div className="flex gap-5">
                <div className="shrink-0 w-48 h-72 bg-gray-800 opacity-75 rounded-xl flex flex-col justify-evenly items-center text-white text-xs">
                    <ItemStats item={item} />
                </div>
                <div className="flex flex-col gap-y-4 w-16 h-48 bg-inv_bg bg-repeat-y bg-contain select-none">
                    <Item url={item.url}/>
                    <img className="w-16 h-16 rounded-full" src={item.author_photoURL} alt={item.author_name}></img>
                </div>
                </div>
                {auth.currentUser.uid === item.author_uid ?
                <button className="p-2 bg-red-400 hover:bg-red-600 rounded-2xl" onClick={() => deleteItem(item.id)}>Delete</button> :
                <button className="p-2 bg-red-400 hover:bg-red-600 rounded-2xl opacity-0">Delete</button>}
            </div>
            )})}
            {showSnackbar && (
        <div className={`w-60 absolute text-center bottom-2 ${messageSnackbar.error === 0 ? "bg-green-400" : "bg-red-400"}`}>
          {t(messageSnackbar.message)}
        </div>
      )}
        </div>
    )
}