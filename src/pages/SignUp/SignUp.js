import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ErrorIcon from '@material-ui/icons/Error';
import PasswordField from '../../components/PasswordField';
import validator from 'validator';

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
    marginTop: theme.spacing(15),
    padding: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.dark,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
  alert: {
    textAlign: 'left',
    fontSize: '12px',
    color: 'red',
  }
}));

export default function SignUp() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState(false);
  const [errorsContent, setErrorsContent] = useState('');
  const [alerts, setAlerts] = useState({'ExistingEmail': false, 'ExistingUsername': false});
  const alertsContent = { 'ExistingEmail': 'Bu e-poçt ünvanı istifadə olunub. Başqa birini seçin.', 
  'ExistingUsername': 'Bu istifadəçi adı istifadə olunub. Başqa birini seçin.'};
  const history = useHistory();

  const onNameChange = (event) => {
    setName(event.target.value);
  }

  const onSurnameChange = (event) => {
    setSurname(event.target.value);
  }

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const onConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  }

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handleSignInClick = () => {
    history.push("/signin");
  }

  const validate = () => {
    let errors = {};
    let errorsContent = {"username":false,"name":false,"email":false,"password":false};
    let isValid = true;
    if (username.length < 6) {
      isValid = false;
      errors["username"] = true;
      errorsContent["username"] = "İstifadəçi adı üçün 6 və daha artıq simvoldan istifadə edin.";
    }
    if (!username) {
      isValid = false;
      errors["username"] = true;
      errorsContent["username"] = "İstifadəçi adı daxil edin.";
    }
    if (!name || !surname){
      isValid = false;
      errors["name"] = true;
      errorsContent["name"] = "Ad və Soyad daxil edin.";
    }
    if (!validator.isEmail(email)) {
      isValid = false;
      errors["email"] = true;
      errorsContent["email"] = "E-poçt ünvanı etibarlı deyil.";
    }
    if (email.length < 6){
      isValid = false;
      errors["email"] = true;
      errorsContent["email"] = "E-poçt ünvanı üçün 6 və daha artıq simvoldan istifadə edin.";
    }
    if (!email) {
      isValid = false;
      errors["email"] = true;
      errorsContent["email"] = "E-poçt ünvanı daxil edin.";
    }
    if (!validator.isStrongPassword(password, {minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1})) {
      isValid = false;
      errors["password"] = true;
      errorsContent["password"] = "Daha güclü parol seçin. Hərflərin (böyük və kiçik), rəqəmlərin və simvolların qarışığını sınayın.";
    }
    if (password.length < 10){
      isValid = false;
      errors["password"] = true;
      errorsContent["password"] = "Parol üçün 10 və daha artıq simvoldan istifadə edin.";
    }
    if (confirmPassword !== password) {
      isValid = false;
      errors["password"] = true;
      errorsContent["password"] = "Parollar uyğun gəlmədi. Yenidən cəhd edin.";
    }
    if (!confirmPassword) {
      isValid = false;
      errors["password"] = true;
      errorsContent["password"] = "Parolunuzu təsdiq edin.";
    }
    if (!password) {
      isValid = false;
      errors["password"] = true;
      errorsContent["password"] = "Parol daxil edin.";
    }
    setErrors(errors);
    setErrorsContent(errorsContent);
    return isValid;
  }

  const onSubmitSignUp = async(event) => {
    event.preventDefault();
    setAlerts({"ExistingUsername": false, 'ExistingEmail': false});
    if (validate()) {
      axios.post("http://localhost:9000/signup", {
        username: username,
        email: email,
        password: password,
        firstName: name,
        lastName: surname,
      })
      .then(response => response.data)
      .then(user => {
        if (user) {
          history.push('/signin')
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data === "Email already exists!"){
            setAlerts({"ExistingUsername": false, 'ExistingEmail': true});
          }
          if (err.response.data === "Username already exists!"){
            setAlerts({'ExistingEmail': false, 'ExistingUsername': true});
          }
        }
      })
    }
  }

  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      onSubmitSignUp();
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
              Qeydiyyat
              </Typography>
              <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Ad"
                  autoFocus
                  onChange = {onNameChange}
                  onKeyPress = {handleKeyPress}
                />
                {errors["name"] && <div className={classes.alert}> {<ErrorIcon fontSize="small"/>} {errorsContent["name"]} </div>}
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Soyad"
                  name="lastName"
                  onChange = {onSurnameChange}
                  onKeyPress = {handleKeyPress}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  size="small"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="İstifadəçi adı"
                  onChange = {onUsernameChange}
                  onKeyPress = {handleKeyPress}
                />
                {errors["username"] && <div className={classes.alert}>{<ErrorIcon fontSize="small"/>} {errorsContent["username"]}</div>}
                {alerts["ExistingUsername"] && <div className={classes.alert}>{<ErrorIcon fontSize="small"/>} {alertsContent["ExistingUsername"]}</div>}
                </Grid>
                <Grid item xs={12}>
                <TextField
                  size="small"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="E-poçt"
                  name="email"
                  onChange = {onEmailChange}
                  onKeyPress = {handleKeyPress}
                />
                {errors["email"] && <div className={classes.alert}>{<ErrorIcon fontSize="small"/>} {errorsContent["email"]}</div>}
                {alerts["ExistingEmail"] && <div className={classes.alert}> {<ErrorIcon fontSize="small"/>} {alertsContent["ExistingEmail"]} </div>}
                </Grid>
                <Grid item xs={12}>
                  <PasswordField onChange={onPasswordChange} fieldSize="small" confirm={false}/>
                  {errors["password"] && <div className={classes.alert}>{<ErrorIcon fontSize="small"/>} {errorsContent["password"]}</div>}
                </Grid>
                <Grid item xs={12}>
                  <PasswordField onChange={onConfirmPasswordChange} fieldSize="small" confirm={true}/>
                {errors["EnterPassword"] && <div className={classes.alert}>{<ErrorIcon fontSize="small"/>} {errorsContent["EnterPassword"]}</div>}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick = {onSubmitSignUp}
              >
                QEYDİYYATDAN KEÇ
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                <Link
                  href='#'
                  onClick={handleSignInClick}
                  variant="body2"
                  >
                    Əvəzinə daxil olun
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