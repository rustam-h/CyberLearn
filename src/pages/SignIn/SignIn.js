import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import ErrorIcon from '@material-ui/icons/Error';
import PasswordField from '../../components/PasswordField';
import { setCurrentUser } from '../../redux/user/user-actions';
import { useDispatch } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    background: "linear-gradient(-45deg, #ee7752, #e73c7e, #A2EDFA, #1BE4ED)",
	  backgroundSize: '400% 400%',
	  animation: `$gradient 15s ease infinite`,
    margin: 0,
    padding: 0,
  },
  "@keyframes gradient": {
    "0%": {
      backgroundPosition: '0% 50%',
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0% 50%",
    },
  },
  paper: {
    marginTop: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    textAlign: 'left',
    marginTop: theme.spacing(16),
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.dark,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    textAlign: 'left',
    fontSize: '12px',
    color: 'red',
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [alerts, setAlerts] = useState('');
  const [alertsContent, setAlertsContent] = useState('');
  const [errors, setErrors] = useState({});
  const [errorsContent, setErrorsContent] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();

  const onEmailChange = (event) => {
    setSignInEmail(event.target.value);
  }

  const onPasswordChange = (event) => {
    setSignInPassword(event.target.value);
  }

  const handleSignUpClick = () => {
    history.push("/signup");
  }

  const validate = () => {
    let errors = {"EnterEmail": false, "EnterPassword": false}
    let errorsContent = {};
    let isValid = true;
    if (!signInEmail) {
      isValid = false;
      errors["EnterEmail"] = true;
      errorsContent["EnterEmail"] = "E-poçt ünvanı daxil edin.";
    }
    if (!signInPassword) {
      isValid = false;
      errors["EnterPassword"] = true;
      errorsContent["EnterPassword"] = "Parol daxil edin.";
    }
    setErrors(errors);
    setErrorsContent(errorsContent);
    return isValid;
  }

  const onSubmitSignIn = async(event) => {
    event.preventDefault();
    setAlerts(false);
    if (validate()){
      axios.post("http://localhost:9000/signin", {
        email: signInEmail,
        password: signInPassword,
      })
      .then(response => response.data)
      .then(data => {
        if (data.token) {
          const token = data.token;
          const username = data.username;
          history.push('/');
          dispatch(setCurrentUser({
            token: token, 
            username: username}));
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data === "Email is wrong!" || 
          err.response.data === "Password is wrong!" ||
          err.response.data === "\"password\" length must be at least 10 characters long" ||
          err.response.data === "\"email\" must be a valid email"){
            setAlertsContent("İstifadəçi adı və ya parol yanlışdır.");
            setAlerts(true);
          }
        }
      })
    }
  }

  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      onSubmitSignIn();
    }
  }

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <Grid container>
          <Paper className={classes.card}>
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h4">
              Giriş
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
                onKeyPress = {handleKeyPress}
              />
              {errors["EnterEmail"] && <div className={classes.alert}> {<ErrorIcon fontSize="small"/>} {errorsContent["EnterEmail"]} </div>}
              <PasswordField 
                onChange={onPasswordChange} 
                fieldSize="medium" 
                confirm={false}
                onKeyPress={handleKeyPress}
              />
              {errors["EnterPassword"] && <div className={classes.alert}>{<ErrorIcon fontSize="small"/>} {errorsContent["EnterPassword"]}</div>}
              {alerts && <Alert severity='error'>{alertsContent}</Alert>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick = {onSubmitSignIn}
              >
                  DAXİL OL
              </Button>
              <Grid container direction="column" alignItems="flex-end">
                <Grid item>
                <Link
                  href='#'
                  onClick={handleSignUpClick}
                  variant="body2"
                  >
                    Hesab yaradın
                </Link>
                </Grid>
              </Grid>
              </form>
            </div>
          </Paper>
        </Grid>
      </Container>
    </div>
  );
}