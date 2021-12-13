import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Collapse } from '@material-ui/core';
import { ButtonBase } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    background:"rgba(0,0,0,0.5)",
    margin: '40px',
    transition: "transform 0.15s ease-in-out",
    '&:hover': {
      transform: "scale3d(1.05, 1.05, 1)",
    },
  },
  media: {
    height: 340,
  },
  title: {
    fontWeight: "bold",
    fontSize: "2rem",
    color: "#fff",
  },
  desc: {
    fontSize: "1.1rem",
    color: "#ddd",
  }
});

export default function ImageCard({ place, checked }) {
  const history = useHistory();
  const classes = useStyles();
  
  const handleClick = () => {
    history.push(`/${place.url}`);
  }

  return (
    <Collapse in={checked} {...(true ? { timeout: 700 } : {})}>
      <ButtonBase onClick={handleClick}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={place.imageUrl}
          />
          <CardContent>
            <Typography
              gutterBottom 
              variant="h5" 
              component="h2" 
              className={classes.title}
            >
              {place.title}
            </Typography>
            <Typography 
              variant="body2" 
              color="textSecondary" 
              component="p"
              className={classes.desc}
            >
              {place.description}
            </Typography>
          </CardContent>
        </Card>
      </ButtonBase>
    </Collapse>
  );
}