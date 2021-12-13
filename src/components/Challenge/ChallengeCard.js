import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Grid, Paper, Chip, ButtonBase } from '@material-ui/core';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: "transform 0.15s ease-in-out",
        '&:hover': {
        transform: "translateY(-15px)",
        },
    },
    media: {
      paddingTop: '56.25%',
    },
    buttonBase: {
        height: '100%',
    },
    content: {
        height: '50%',
    },
    tags: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    chip: {
        margin: theme.spacing(0.5),
      },
  }));

export default function ChallengeCard({challenge}) {
    const history = useHistory();
    const classes = useStyles();
    const tagsList = challenge.tags;

    const handleClick = () => {
        history.push(`challenge/${challenge._id}`);
    }

    var randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    return (
        <Grid item key={challenge} xs={12} sm={6} md={4}>
            <Card className={classes.root} raised>
                <ButtonBase onClick={handleClick} className={classes.buttonBase}>
                    <CardActionArea className={classes.buttonBase}>
                        <CardMedia 
                            style={{'background-color': randomColor}}
                            className={classes.media}
                            title={challenge.title}
                        />
                        <CardContent className={classes.content}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {challenge.title}
                            </Typography>
                            <Typography gutterBottom>
                                Səviyyə: {challenge.difficulty}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {challenge.description}
                            </Typography>
                            <Paper className={classes.tags} elevation={0}>
                                {tagsList.length &&
                                tagsList.map((tag) => {
                                    return (
                                        <Chip
                                            className={classes.chip}
                                            size="small"
                                            color="primary"
                                            label={tag}
                                        />
                                    )
                                })
                            }
                            </Paper>
                        </CardContent>
                    </CardActionArea>
                </ButtonBase>
            </Card>
        </Grid>
    )
}