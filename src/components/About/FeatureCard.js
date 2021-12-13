import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
        height: "100%",
        justifyContent: 'center',
        background: theme.palette.background.default,
        '&:hover': {
            background: "#FFFFFF",
            boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.12)',
        },
    },
    iconColor: {
        background: theme.palette.secondary.light,
        width: 80,
        height: 80,
    },
    cover: {
        marginTop: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export default function FeatureCard(props) {
    const classes = useStyles();

  return (
    <Grid item xs={12} sm={6}>
    <Card className={classes.root}>
        <Grid item xs={12}>
        <CardMedia className={classes.cover}>
            <Avatar className={classes.iconColor}>
                {props.icon}
            </Avatar>
        </CardMedia>
        </Grid>
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2" style={{fontWeight: 600}}
            color="primary">
                {props.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {props.content}
            </Typography>
        </CardContent>
    </Card>
    </Grid>
  );
}