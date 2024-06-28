import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentItem: {
        url: './grude_sword.png',
        name: "Grude Sword",
        level: 75,
        attackValue: { min: 226, max: 274 },
        attackMagicValue: null,
        attackSpeed: 26,
        bonus_1: { name: 'Average Damage', value: 3 },
        bonus_2: { name: 'Skill Damage', value: 4 },
        bonus_3: { name: 'Spell Speed', value: 2, isStat: false },
        bonus_4: { name: 'Vitality', value: 8, isStat: true },
        bonus_5: { name: 'Poison Chance:', value: 5, isStat: false },
        wearable: ['Warrior'],
    }
};

const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        updateItem: (state, action) => {
            state.currentItem = {
                ...state.currentItem,
                ...action.payload
            };
        },
        changeItem: (state, action) => {
            state.currentItem = action.payload;
        }
    }
});

export const { updateItem, changeItem } = itemSlice.actions;

export default itemSlice.reducer;
