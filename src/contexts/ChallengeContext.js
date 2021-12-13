import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ChallengeContext = createContext();

const ChallengeContextProvider = (props) => {
    const [challengesList, setChallengesList] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:9000/challenges/')
        .then(res => {
            setChallengesList(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <ChallengeContext.Provider value={{challengesList}}>
            {props.children}
        </ChallengeContext.Provider>
    )
}

export default ChallengeContextProvider;