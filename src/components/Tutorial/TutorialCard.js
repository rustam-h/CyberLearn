import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ButtonBase } from '@material-ui/core';
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

export default function TutorialCard({tutorial}) {
  const history = useHistory();
  const classes = useStyles();
  const tagsList = tutorial.tag;

  const handleClick = () => {
    history.push(`tutorial/${tutorial._id}`);
  }

  return (
    <Grid item key={tutorial} xs={12} sm={6} md={4}>
      <Card className={classes.root} raised>
        <ButtonBase onClick={handleClick}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={tutorial.images[0]}
              title={tutorial.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {tutorial.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {tutorial.description}
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
  );
}