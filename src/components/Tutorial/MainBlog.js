import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    heading: {
        fontWeight: 700,
        fontFamily: "Noto Serif",
    },
    subheading: {
        fontWeight: 700,
        paddingBottom: theme.spacing(4),
    },
    paragraph: {
        fontFamily: "Noto Serif",
        marginBottom: theme.spacing(2),
    },
    paragraphPaper: {
        marginTop: theme.spacing(1),
    },
    image: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export default function MainBlog({ tutorial }) {
    const classes = useStyles();
    return (
        <Grid item>
            <Typography variant="h3" align="left" gutterBottom className={classes.heading}>
                {tutorial.title}
            </Typography>
            <Paper elevation={0}>
                {tutorial.content.map((content) => {
                    return(
                        <Typography variant="h5" align="justify" className={classes.subheading} gutterBottom>
                            {content.subheader}
                            <Paper elevation={0} className={classes.paragraphPaper}>
                                {content.paragraphs.map(({ paragraphContent, imageURL }) => {
                                    return(
                                        <>
                                            <Typography gutterBottom className={classes.paragraph}>
                                                {paragraphContent}
                                            </Typography>
                                            <div className={classes.image}>
                                                <img src={imageURL} alt=""/>
                                            </div>
                                        </>
                                    )
                                })}
                            </Paper>
                        </Typography> 
                    )
                })}
                {tutorial.references.length > 0 && 
                    <Typography variant="h5" align="justify" className={classes.subheading}>
                        References
                    </Typography>
                }
                {tutorial.references.map((ref) => {
                    return(
                        <Typography className={classes.paragraph} align="left">
                            <a href={`${ref}`}>{ref}</a>
                        </Typography>
                    )})
                }
            </Paper>

        </Grid>
    );
}