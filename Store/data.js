import create from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from '@react-native-community/async-storage';

export const useDataState = create(
    persist(
        set => ({
            categories: ["Mercado", "Comida", "Combustível"],
            data: [],
            month: [],
            categorySelected: null,

            addData: (newData) => set(state => {
                    return { data: [...state.data, newData] }
            }),

            setData: () => set(state => ({
                data: state.data,
            })),

            setMonth: (newMonth) => set(state => ({
                month: [...state.month, newMonth],
            })),

            removeData: (id) => set(state => {
                return {
                data: state.data.filter(item => item.id !== id)
                }
            }),

            removeCategory: (category) => set(state => ({
                data: state.data.filter(item => item.category !== category),
                categories: state.categories.filter(item => item !== category)
            })),

            clearData: () => set({
                categories: {},
                data: [],
            }),

            addCategory: (newCategory) => set(state => ({
                categories: [...state.categories, newCategory],
            })),

            setCategorySelected: (category) => set(({
                categorySelected: category,
            })),
        }),
        {
            name: 'GestorFinanceiro@data',
            getStorage: () => AsyncStorage,
        }
    )
);