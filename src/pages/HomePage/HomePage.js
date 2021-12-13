import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { Collapse } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomePageAppBar from '../../components/NavBar/HomePageAppBar';
import PlaceToVisit from '../../components/PlaceToVisit';
import { Link as Scroll} from 'react-scroll'


const useStyles = makeStyles((theme) => ({
    main: {
        background: "linear-gradient(45deg, rgba(11,13,218,1) 0%, rgba(11,13,218,0.65) 75%)",
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },
    title: {
        color: "#fff",
        textAlign: "center",
        [theme.breakpoints.down('xs')]: {
            fontSize: '2.5rem',
        },
        fontSize: '3.4rem',
    },
    styledText: {
        color: theme.palette.secondary.main,
    },
    goDown: {
        color: theme.palette.secondary.main,
        fontSize: '2rem',
    },
}));

export default function HomePage() {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, [])
    return (
        <div className={classes.main}>
            <div className={classes.root}>
                <CssBaseline />
                <HomePageAppBar/>

                <Collapse
                    in={checked} 
                    {...(checked ? { timeout: 700 } : {})}
                    collapsedHeight={50}
                >
                    <h1 className={classes.title}> 
                        <span className={classes.styledText}>
                            Kibertəhlükəsizlik 
                        </span>
                        <br />
                        öyrənmə platforması
                    </h1>
                    <Scroll to="place-to-visit" smooth={true}>
                        <IconButton>
                            <ExpandMoreIcon className={classes.goDown} />
                        </IconButton>
                    </Scroll>
                </Collapse>
                
            </div>
            <PlaceToVisit/>
        </div>
    )
}