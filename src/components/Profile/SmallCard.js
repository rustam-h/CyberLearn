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
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconBackground: {
        width: '60%',
        height: '60%',
        background: theme.palette.secondary.light,
    },
  }));

  export default function SmallCard(props) {
    const classes = useStyles();
  
    return (
        <Grid item xs={12} sm={6}>
            <Card className={classes.root}>
                <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5" color="textSecondary">
                    {props.feature}
                    </Typography>
                    <Typography variant="h3">
                    {props.number}
                    </Typography>
                </CardContent>
                </div>
                <CardMedia className={classes.cover}>
                  <Avatar variant="rounded" className={classes.iconBackground}>
                    {props.icon}
                  </Avatar>
                </CardMedia>
            </Card>
        </Grid>
    );
  }