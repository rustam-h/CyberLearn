import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    blogBanner: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)', 
    },
    blogBannerContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
}));

export default function BlogBanner({ tutorial }) {
    const classes = useStyles(tutorial);
    return (
        <div>
        {tutorial.images &&
            <Paper 
                className={classes.blogBanner} 
                style={{ 
                    backgroundImage: `url(${tutorial.images[0]})`
                }}
            >
                {<img style={{ display: 'none' }} src={tutorial.images[0]} alt=""/>}
                <div className={classes.overlay} />
                <Grid container>
                    <Grid item md={6}>
                        <div className={classes.blogBannerContent}>
                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                {tutorial.title}
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                {tutorial.description}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        }
        </div>
    );
}