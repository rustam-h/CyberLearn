import React, { useContext } from 'react';
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core';
import MainBlog from '../../components/Tutorial/MainBlog';
import BlogBanner from '../../components/Tutorial/BlogBanner';
import PreviousBlog from '../../components/Tutorial/PreviousBlog';
import NextBlog from '../../components/Tutorial/NextBlog';
import { TutorialContext } from '../../contexts/TutorialContext';
import Quiz from '../../components/Quiz/Quiz';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(20),
    },
    navButtons: {
        display: "flex",
        justifyContent: "space-between",
    },
}));

export default function Tutorial() {
    const classes = useStyles();
    const { id } = useParams();
    const { tutorialsList } = useContext(TutorialContext);

    const indexOfTutorial = tutorialsList.findIndex(obj =>  obj._id === id);
    const tutorial = tutorialsList[indexOfTutorial];
    const previousTutorial = tutorialsList[Math.max(indexOfTutorial - 1, 0)];
    const nextTutorial = tutorialsList[Math.min(indexOfTutorial + 1, tutorialsList.length - 1)];
    
    const previousBool = (indexOfTutorial - 1 > -1) ? false : true;
    const nextBool = (indexOfTutorial + 1 < tutorialsList.length) ? false : true;
    return(
        <div className={classes.root}>
            <Container maxWidth="md">
                {tutorial && tutorial.content && 
                    <div>
                        <BlogBanner tutorial={tutorial}/>
                        <Grid container className={classes.navButtons}>
                            <PreviousBlog tutorial={previousTutorial} bool={previousBool}/>
                            <NextBlog tutorial={nextTutorial} bool={nextBool}/>
                        </Grid>
                        <MainBlog tutorial={tutorial}/>
                        <Quiz questions={tutorial.quiz} />
                        <Grid container className={classes.navButtons}>
                            <PreviousBlog tutorial={previousTutorial} bool={previousBool}/>
                            <NextBlog tutorial={nextTutorial} bool={nextBool}/>
                        </Grid>
                    </div>
                }
            </Container>
        </div>
    );
}