import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Chip, Button, Typography, TextField, Paper } from '@material-ui/core';
import { Card, CardContent, CardMedia } from '@material-ui/core';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FlagIcon from '@material-ui/icons/Flag';
import SimplePortal from '../../components/Challenge/Portal';
import { ChallengeContext } from '../../contexts/ChallengeContext';
import { selectUserToken } from '../../redux/user/user-selectors';
import { useSelector  } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ErrorIcon from '@material-ui/icons/Error';
import { green, red } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(5),
    padding: theme.spacing(2),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '100%',
    paddingTop: '100%',
  },
  tags: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
        margin: theme.spacing(0.5),
    },
  },
  button: {
    borderRadius: '16px',
    background: theme.palette.secondary.light,
  },
  div: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Challenge() {
  const classes = useStyles();
  const { id } = useParams();
  const { challengesList } = useContext(ChallengeContext);
  const challenge = challengesList.find(obj =>  obj._id === id);
  const [userFlag, setUserFlag] = useState('');
  const token = useSelector(selectUserToken);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const onUserFlagChange = (event) => {
    event.preventDefault();
    setUserFlag(event.target.value);
  }

  const handleFlagCheck = () => {
    axios.post("http://localhost:9000/challenges/check", {
      id: id,
      flag: userFlag,
    }, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
    .then(response => response.data)
    .then(message => {
      if (message === "Challenge is completed!") {
        setOpenSuccess(true);
      }
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.data === "Your solution is wrong!") {
          setOpenError(true);
        }
      }
    })
  }

  const handleClose = () => {
    setOpenSuccess(false);
    setOpenError(false);
  };

  return (
    <Container component="main" maxWidth="lg">
      {challenge &&
        <div>
          <Card className={classes.root} style={{marginTop: '120px'}} elevation={0}>
            <Grid container>
              <Grid item xs={12} sm={3} md={3} className={classes.image}>
                <CardMedia
                  className={classes.cover}
                  image="/assets/challenge.png"
                  title="Challenge"
                />
              </Grid>
              <Grid item xs={12} sm={9} md={9}>
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography align="center" component="h4" variant="h4" paragraph>
                      {challenge.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" paragraph>
                      {challenge.description}
                    </Typography>
                    <Paper className={classes.tags} elevation={0}>
                      {challenge.tags.length &&
                        challenge.tags.map((tag) => {
                          return (
                            <Chip
                              className={classes.chip}
                              color="primary"
                              label={tag}
                            />
                          )
                        })
                      }
                    </Paper>
                    <div className={classes.div}>
                    <Button className={classes.button}
                      disableElevation
                      variant="contained" 
                      color="primary"
                      size="large"
                      startIcon={<PlayCircleFilledIcon/>}
                      href={challenge.webServiceLink}
                      target="_blank"
                    >
                        Başla
                    </Button>
                    </div>
                    <div className={classes.div}>
                      <TextField 
                        id="outlined-basic" 
                        label="Bayraq" 
                        variant="outlined" 
                        onChange= {onUserFlagChange} 
                      />
                      <Button className={classes.button}
                        disableElevation
                        variant="contained" 
                        color="primary"
                        size="large"
                        startIcon={<FlagIcon/>}
                        onClick={handleFlagCheck}
                      >
                        Yoxla
                      </Button>
                      <Dialog
                        open={openSuccess}
                        onClose={handleClose}
                        PaperProps={{
                          style: {
                            backgroundColor: '#DDF3E2',
                            textAlign: 'center',
                            color: 'rgb(30, 70, 32)',
                          },
                        }}
                      >
                        <DialogTitle>
                        <CheckCircleIcon style={{ color: green[500], fontSize: '2rem', verticalAlign: 'middle'}} />
                        Cavab düzgündür!</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Təbriklər! Siz {challenge.score} xal qazandınız. Qazandığınız xalları Profil bölməsində görə bilərsiniz.
                          </DialogContentText>
                        </DialogContent>
                      </Dialog>
                      <Dialog
                        open={openError}
                        onClose={handleClose}
                        PaperProps={{
                          style: {
                            backgroundColor: 'rgb(253, 236, 234)',
                            textAlign: 'center',
                            color: 'rgb(97, 26, 21)',
                          },
                        }}
                      >
                        <DialogTitle>
                        <ErrorIcon style={{ color: red[500], fontSize: '2rem', verticalAlign: 'middle'}}/>
                        Cavab yanlışdır!</DialogTitle>
                        <DialogContent>
                          <DialogContentText >
                            Təəssüf ki, doğru cavab vermədiniz. Bir daha sınayın.
                          </DialogContentText>
                        </DialogContent>
                      </Dialog>

                    </div>
                  </CardContent>
                </div>
              </Grid>
            </Grid>
          </Card>
          <Card className={classes.root} elevation={0}>
            <Grid container>
              <Grid item xs={12}>
                <SimplePortal/>
              </Grid>
            </Grid>
          </Card>
        </div>
      }
    </Container>
  );
}