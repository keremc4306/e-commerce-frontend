import { createContext, useContext } from "react";

const initialBasketState = {
    items: []
};



function basketStateReducer(state = initialBasketState, action) {
    let newState = state;

    switch (action.type) {
        case "ADD_ITEM":
            newState = { ...state, items: [...state.items, action.payload] }
            break;

        case "REMOVE_ITEM":
            newState = { ...state, items: state.items.filter((item) => item.itemNo !== action.payload) }
            break;

        case "CLEAR_BASKET":
            newState = initialBasketState;
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
