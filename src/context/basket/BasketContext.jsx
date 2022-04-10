import { createContext, useContext } from "react";

const initialBasketState = {
    items: []
};



function basketStateReducer(state = initialBasketState, action) {
    let newState = state;
    const itemIndex = state.items.map(basketItem => basketItem.item.itemNo)
            .indexOf(action.payload.itemNo);
    switch (action.type) {
        case "ADD_ITEM":
            


            if(itemIndex > -1) {
                newState = {
                    ...state,
                    items: [
                        ...state.items.slice(0, itemIndex),
                        {...state.items[itemIndex], count: state.items[itemIndex].count + 1},
                        ...state.items.slice(itemIndex + 1)
                    ]
                }
                return newState;
            }
            return {...state, items: [...state.items, {item: action.payload, count: 1}]}
            break;

        case "REMOVE_ITEM":
            const itemIndex2 = state.items.map(basketItem => basketItem.item.itemNo)
            .indexOf(action.payload.itemNo);
            console.log(itemIndex2)
            console.log(state)

            // eğer state.items.itemIndex'in countu 1'se state'teki itemlardan o itemı filterla (at). 
            // Eğer 1'den büyükse state teki itemlardan o indeksteki elemanın countunu 1 eksilt.

            /* if (itemIndex2 > -1) {
                newState = { 
                    ...state, 
                    items: [
                        ...state.items.slice(0, itemIndex2-1),
                        {...state.items[itemIndex2], count: state.items[itemIndex2].count - 1},
                        ...state.items.slice(itemIndex2 - 1)
                    ]
                }
                return newState;
            }
            return {...state, items: [...state.items, {item: action.payload, count: 0}]} */
            break;

        case "CLEAR_BASKET":
            newState = initialBasketState;
            break;
        default:
            break;    
    }

    return newState;
}

function useBasketContext() {
    const basketContext = useContext(BasketContext);

    return basketContext;
}

const BasketContext = createContext({ basketState: initialBasketState, dispatchBasketStateAction: (() => undefined) })

export default BasketContext;
export { initialBasketState, basketStateReducer, useBasketContext }
