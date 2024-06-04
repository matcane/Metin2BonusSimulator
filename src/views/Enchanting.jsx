import { useTranslation } from "react-i18next";
import Enchant from "../components/Enchant";
import Item from "../components/Item";
import ItemStats from "../components/ItemStats";

export default function Enchanting(props) {
    const { t } = useTranslation();
    const { showSnackbar, messageSnackbar, canCreateItem, currentItem, shuffle, createItem } = props;

    return(
    <div className="flex flex-col justify-evenly items-center w-full h-full">
      <button className={`w-60 p-2 rounded-2xl ${canCreateItem ? "bg-green-400 hover:bg-green-600" : "bg-red-400"}`} onClick={createItem}>{t("Save weapon")}</button>
        <div className="text-base w-64 h-80 bg-gray-800 opacity-75 rounded-xl flex flex-col justify-evenly items-center text-white sm:text-base sm:w-64 sm:h-96">
          <ItemStats item={currentItem} />
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="w-16 h-48 bg-inv_bg bg-repeat-y bg-contain select-none">
            <Item url={currentItem.url}/>
          </div>
          <div className="w-16 h-16 bg-inv_bg bg-no-repeat bg-cover select-none">
            <Enchant shuffle={shuffle}/>
          </div>
        </div>
        {showSnackbar && (
        <div className={`w-60 absolute text-center bottom-2 ${messageSnackbar.error === 0 ? "bg-green-400" : "bg-red-400"}`}>
          {t(messageSnackbar.message)}
        </div>
      )}
      </div>
    )
}