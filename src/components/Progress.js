import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

export default function Progress({list}) {
    const classes = useStyles();
    return (
        <React.Fragment>
        {list.length === 0 &&
            <Box className={classes.root} position="absolute" zIndex="tooltip">
                <LinearProgress color="secondary" />
            </Box>
        }
        </React.Fragment>
    );
}
  