import { useState, useEffect } from 'react';

//Note globalStore will be created once and not change when rerender.
let globalState = {};
//Array below grows in time the more components we add.
let listeners = [];
let actions = {};

export const useStore = () => {
    const setState = useState(globalState)[1];

    const dispatch = (actionIndentyfier,payload) => {
        const newState = actions[actionIndentyfier](globalState, payload);
        globalState = {...globalState, ...newState};

        for (const listener of listeners) {
            listener(globalState);
        };
    };

    useEffect(() => {
        //listeners all just setState calls that will rerender when any component will use them.
        //We redister one listener per component
        listeners.push(setState);
        //return is a clean up function that unmounts listeners when it unmounts
        //We unregister that listener when component is destroied 
        return () => {
            return listeners => listeners.filter(li => li !== setState);
        }
    },[setState]);

    return [globalState, dispatch];
};
//initStore can be called multiple times because we are not replacing globalState or actions we just megde them with new data.
//This way we create concreate store slices just as we do with redux with multiple reducers,
//Where with one slice we manage our products, with other we manage our authentication.
//Ofcourse we have to avoid name clashes but that's all.
export const initStore = (userActions, initialState) => {
    if(initialState) {
        globalState = {...globalState, ...initialState};
    };
    actions = {...actions, ...userActions};
};