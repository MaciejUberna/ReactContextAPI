import { useState, useEffect } from 'react';

//Note globalStore will be created once and not change when rerender.
let globalState = {};
//Array below grows in time the more components we add.
let listeners = [];
let actions = {};

const useStore = () => {
    const setState = useState(globalState)[1];
    useEffect(() => {
        listeners.push(setState);
        //return is a clean up function that unmounts listeners when it unmounts
        return () => {
            return listeners => listeners.filter(li => li !== setState);
        }
    },[setState]);
};