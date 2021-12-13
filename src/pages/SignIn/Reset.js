import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
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
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

}));

export default function SignIn(props) {
  const classes = useStyles();
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const history = useHistory();

  const onPasswordChange = (event) => {
    setNewPassword(event.target.value);
  }

  const onConfirmPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
        token: props.match.params.id,
        password: newPassword,
        confirmation_password: confirmNewPassword,
    }
    axios.post('reset', data).then(
        res => {
            console.log(res);
            history.push("/signin");
        }
    ).catch(err => console.log(err))
 }

  return (
    <Container component="main" maxWidth="xs">
        <Grid container>
            <Paper className={classes.card}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
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
                        name="password"
                        label="Parol"
                        type="password"
                        id="password"
                        onChange = {onPasswordChange}
                    />
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="confirmation_password"
                            label="Təsdiq edin"
                            type="password"
                            id="confirmation_password"
                            onChange = {onConfirmPasswordChange}
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick = {handleSubmit}
                    >
                        TƏSDİQ ET
                    </Button>
                    </form>
                </div>
            </Paper>
        </Grid>
    </Container>
  );
}