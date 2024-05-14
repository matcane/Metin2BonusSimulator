import { useState } from "react"
import { useTranslation } from 'react-i18next';
import './i18n';
import Enchant from "./Enchant"
import Item from "./Item"
import ItemStats from "./ItemStats"


function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    const currentLanguage = i18n.language;
    const newLanguage = currentLanguage === 'en' ? 'pl' : 'en';
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const availableBonuses = {
    0: { name: 'Chance of Piercing Hit', values: [2, 3, 5, 10]},
    1: { name: 'Chance of Critical Hit', values: [2, 3, 5, 10]},
    2: { name: 'Poison Chance:', values: [3, 5, 8]},
    3: { name: 'Chance of Blackout:', values: [2, 3, 5, 8]},
    4: { name: 'Slowing Chance:', values: [2, 3, 5, 8]},
    5: { name: 'Spell Speed', values: [2, 6, 10, 20]},
    6: { name: 'Intelligence', values: [2, 4, 6, 8, 12]},
    7: { name: 'Strength', values: [2, 4, 6, 8, 12]},
    8: { name: 'Agility', values: [2, 4, 6, 8, 12]},
    9: { name: 'Vitality', values: [2, 4, 6, 8, 12]},
    10: { name: 'Strong Against Mystic', values: [2, 4, 6, 8, 10, 20],},
    11: { name: 'Strong Against Half Human', values: [1, 2, 3, 5, 10],},
    12: { name: 'Strong Against Orcs', values: [2, 4, 6, 8, 10, 20],},
    13: { name: 'Strong Against Devils', values: [2, 4, 6, 8, 10, 20],},
    14: { name: 'Strong Against Animals', values: [2, 4, 6, 8, 10, 20],},
    15: { name: 'Strong Against Undead', values: [2, 4, 6, 8, 10, 20],},
  }
  const [currentItem, setCurrentItem] = useState({
    url: './grude_sword.png',
    name: "Grude Sword",
    level: 75,
    attackValue: {min: 226, max: 274},
    attackMagicValue: null,
    attackSpeed: 26,
    bonus_1: {name: 'Average Damage', value: 3},
    bonus_2: {name: 'Skill Damage', value: 4},
    bonus_3: {name: 'Spell Speed', value: 2},
    bonus_4: {name: 'Vitality', value: 8},
    bonus_5: {name: 'Poison Chance:', value: 5},
    wearable: ['Warrior'],
  })

  const shuffle = () => {
    function gauss_random(mean, std_dev) {
      let u1 = 0, u2 = 0;
      while (u1 === 0) u1 = Math.random();
      while (u2 === 0) u2 = Math.random();
      
      let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      return z0 * std_dev + mean;
  }
  
  function number(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function MINMAX(min, value, max) {
      return Math.min(Math.max(value, min), max);
  }

  let iSkillBonus = MINMAX(-30, Math.round(gauss_random(0, 5) + 0.5), 30);
  let iNormalHitBonus = 0;
  
  if (Math.abs(iSkillBonus) <= 20) {
      iNormalHitBonus = -2 * iSkillBonus + Math.abs(number(-8, 8) + number(-8, 8)) + number(1, 4);
  } else {
      iNormalHitBonus = -2 * iSkillBonus + number(1, 5);
  }

  function getRandomBonus(min, max, count) {
    if (count > (max - min + 1)) {
        throw new Error("Nie można wygenerować wymaganej liczby unikalnych liczb w zadanym przedziale.");
    }
    const randomBonuses = new Set();

    while (randomBonuses.size < count) {
        const randomBonus = Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
        randomBonuses.add(randomBonus);
    }
    return Array.from(randomBonuses);
}

  const randomBonuses = getRandomBonus(0, 15, 5);
  const result = {};
  let count = 0;
  randomBonuses.forEach(element => {
    const randomBonus = availableBonuses[element].name
    const randomValue = availableBonuses[element].values[Math.floor(Math.random() * availableBonuses[element].values.length)];
    result[count] = {name: randomBonus, value: randomValue};
    count++;
  });

const avg_obj = {
  name: iNormalHitBonus === 0 ? result[4].name : "Average Damage", 
  value: iNormalHitBonus === 0 ? result[4].value : iNormalHitBonus
}

const skill_obj = {
  name: iSkillBonus === 0 ? result[4].name : "Skill Damage", 
  value: iSkillBonus === 0 ? result[4].value : iSkillBonus
}

  setCurrentItem(prevItem => ({
      ...prevItem,
      bonus_1: iNormalHitBonus === 0 ? skill_obj : avg_obj,
      bonus_2: iNormalHitBonus === 0 ? avg_obj : skill_obj,
      bonus_3: {name: result[0].name, value: result[0].value},
      bonus_4: {name: result[1].name, value: result[1].value},
      bonus_5: {name: result[2].name, value: result[2].value},
    }));
  }

  return (
    <div className="flex flex-col pb-4 pt-4 justify-center items-center w-screen h-dvh bg-bg bg-cover lg:pt-16">
      <button className="w-32 h-16 bg-black border-2 border-gray-800 rounded-xl text-white font-bold" onClick={() => changeLanguage()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path fillRule="evenodd" d="M9 2.25a.75.75 0 0 1 .75.75v1.506a49.384 49.384 0 0 1 5.343.371.75.75 0 1 1-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 0 1-2.97 6.323c.318.384.65.753 1 1.107a.75.75 0 0 1-1.07 1.052A18.902 18.902 0 0 1 9 13.687a18.823 18.823 0 0 1-5.656 4.482.75.75 0 0 1-.688-1.333 17.323 17.323 0 0 0 5.396-4.353A18.72 18.72 0 0 1 5.89 8.598a.75.75 0 0 1 1.388-.568A17.21 17.21 0 0 0 9 11.224a17.168 17.168 0 0 0 2.391-5.165 48.04 48.04 0 0 0-8.298.307.75.75 0 0 1-.186-1.489 49.159 49.159 0 0 1 5.343-.371V3A.75.75 0 0 1 9 2.25ZM15.75 9a.75.75 0 0 1 .68.433l5.25 11.25a.75.75 0 1 1-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 0 1-1.36-.634l5.25-11.25A.75.75 0 0 1 15.75 9Zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726Z" clipRule="evenodd" />
        </svg>
      </button>
      
      

      <div className="hidden w-2/3 h-full overflow-y-auto justify-center items-center">
      <button className="w-1/2 h-1/2 bg-blue-600 rounded-xl" onClick={() => changeLanguage()}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="m-auto w-16 h-16 text-white">
        <path fillRule="evenodd" d="M9 2.25a.75.75 0 0 1 .75.75v1.506a49.384 49.384 0 0 1 5.343.371.75.75 0 1 1-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 0 1-2.97 6.323c.318.384.65.753 1 1.107a.75.75 0 0 1-1.07 1.052A18.902 18.902 0 0 1 9 13.687a18.823 18.823 0 0 1-5.656 4.482.75.75 0 0 1-.688-1.333 17.323 17.323 0 0 0 5.396-4.353A18.72 18.72 0 0 1 5.89 8.598a.75.75 0 0 1 1.388-.568A17.21 17.21 0 0 0 9 11.224a17.168 17.168 0 0 0 2.391-5.165 48.04 48.04 0 0 0-8.298.307.75.75 0 0 1-.186-1.489 49.159 49.159 0 0 1 5.343-.371V3A.75.75 0 0 1 9 2.25ZM15.75 9a.75.75 0 0 1 .68.433l5.25 11.25a.75.75 0 1 1-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 0 1-1.36-.634l5.25-11.25A.75.75 0 0 1 15.75 9Zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726Z" clipRule="evenodd" />
      </svg>
      </button>
      </div>
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
    </div>
  )
}

export default App
