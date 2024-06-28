import { availableBonuses } from "../data/constants";
import { useDispatch } from "react-redux";
import { updateItem } from "../state/item/itemSlice.js";


export default function useShuffle() {
    const dispatch = useDispatch();

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
            const randomBonus = availableBonuses[element].name;
            const randomValue = availableBonuses[element].values[Math.floor(Math.random() * availableBonuses[element].values.length)];
            const isStat = availableBonuses[element].isStat;
            result[count] = {name: randomBonus, value: randomValue, isStat: isStat};
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

        dispatch(updateItem({
            bonus_1: iNormalHitBonus === 0 ? skill_obj : avg_obj,
            bonus_2: iNormalHitBonus === 0 ? avg_obj : skill_obj,
            bonus_3: {name: result[0].name, value: result[0].value, isStat: result[0].isStat},
            bonus_4: {name: result[1].name, value: result[1].value, isStat: result[1].isStat},
            bonus_5: {name: result[2].name, value: result[2].value, isStat: result[2].isStat},
        }))
    }

    return { shuffle }
}