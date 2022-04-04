import { useReducer } from "react";

import BasketContext, { basketStateReducer, initialBasketState } from "./BasketContext";

function BasketContextProvider({ children }) {
    const [basketState, dispatchBasketStateAction] = useReducer(basketStateReducer, initialBasketState);

    return (
        <BasketContext.Provider value={{ basketState, dispatchBasketStateAction }}>
            {children}
        </BasketContext.Provider>
    )


}

export default BasketContextProvider;
