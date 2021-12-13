import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    card: {
      textAlign: 'left',
      margin: theme.spacing(4),
      padding: theme.spacing(2),
    },
    avatar: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
      width: '50px',
      height: '50px',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
export default function Forgot() {
    const classes = useStyles();
    const [userEmail, setUserEmail] = useState('');
    
    const onEmailChange = (event) => {
      setUserEmail(event.target.value);
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = {
        email: userEmail
      }

      axios.post('forgot', data).then(
        res => {
            console.log(res);
        }
      ).catch(
          err => {
              console.log(err);
          }
      )
    }
  
    return (
      <Container component="main" maxWidth="xs">
          <Grid container>
              <Paper className={classes.card}>
                  <CssBaseline />
                  <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                      <ContactMailIcon fontSize="large"/>
                    </Avatar>
                      <Typography component="h1" variant="h4">
                      Hesab Bərpası
                      </Typography>
                      <form className={classes.form} noValidate>
                      <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="E-poçt"
                          type="email"
                          name="email"
                          autoFocus
                          onChange = {onEmailChange}
                      />
                      <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          onClick = {handleSubmit}
                      >
                          Davam et
                      </Button>
                      </form>
                  </div>
              </Paper>
          </Grid>
      </Container>
    );
  }