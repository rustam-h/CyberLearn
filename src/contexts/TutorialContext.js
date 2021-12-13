import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TutorialContext = createContext();

const TutorialContextProvider = (props) => {
    const [tutorialsList, setTutorialsList] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:9000/tutorials/')
        .then(res => {
            setTutorialsList(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }, []);
    
    return (
        <TutorialContext.Provider value={{tutorialsList}}>
            {props.children}
        </TutorialContext.Provider>
    );
};

export default TutorialContextProvider;