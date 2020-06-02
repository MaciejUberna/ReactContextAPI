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
        listeners.push(setState);
        //return is a clean up function that unmounts listeners when it unmounts
        return () => {
            return listeners => listeners.filter(li => li !== setState);
        }
    },[setState]);

    return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
    if(initialState) {
        globalState = {...globalState, ...initialState};
    };
    actions = {...actions, ...userActions};
};