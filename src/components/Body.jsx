import useShuffle from "../hooks/useShuffle";
import Enchant from "./Enchant";
import Item from "./Item";
import ItemStats from "./ItemStats";

export default function Body() {
    const { currentItem, shuffle } = useShuffle();
    
    return(
    <div className="flex flex-col justify-evenly items-center w-1/4 h-full">
        <div className="w-60 h-96 bg-gray-800 opacity-75 rounded-xl flex flex-col justify-evenly items-center text-white">
          <ItemStats item={currentItem} />
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="w-16 h-48 bg-inv_bg bg-repeat-y bg-contain select-none">
            <Item url={currentItem.url}/>
          </div>
          <div className="w-16 h-16 bg-inv_bg bg-no-repeat bg-cover select-none">
            <Enchant shuffle={shuffle}/>
          </div>
        </div>
      </div>
    )
}