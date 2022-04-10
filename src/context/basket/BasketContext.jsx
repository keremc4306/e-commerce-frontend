import { createContext, useContext } from "react";

const initialBasketState = {
    items: []
};



function basketStateReducer(state = initialBasketState, action) {
    let newState = state;

    switch (action.type) {
        case "ADD_ITEM":
            const itemIndex = state.items.map(basketItem => basketItem.item.itemNo)
            .indexOf(action.payload.itemNo);

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
            if (itemIndex > -1) {
                newState = { 
                    ...state, 
                    items: [
                        ...state.items.slice(0, itemIndex-1),
                        {...state.items[itemIndex], count: state.items[itemIndex-1].count - 1},
                        ...state.items.slice(itemIndex - 1)
                    ]
                }
                return newState;
            }
            return {...state, items: [...state.items, {item: action.payload, count: 1}]}
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
