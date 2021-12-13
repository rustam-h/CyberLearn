import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import DrawerComponent from './DrawerComponent';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { menuButtons } from './MenuItems';
import { useSelector  } from 'react-redux';
import { selectUserToken } from '../../redux/user/user-selectors';
import { removeCurrentUser } from '../../redux/user/user-actions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '100vh',
  },
  appbar: {
    backgroundColor: theme.palette.primary.light,
  },
  nameStyle: {
    fontSize: '1.2rem',
    fontFamily: 'Noto Serif',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
  },
  button: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    color: theme.palette.primary.contrastText,
  },
  linkStyle: {
    position: "relative",
    display: "inline-block",
    textDecoration: "none",
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: "2px",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    paddingBottom: "4px",
    transition: "all 0.3s",
    color: theme.palette.primary.contrastText,
    '&::before': {
      content: "''",
      position: "absolute",
      display: "block",
      width: "100%",
      height: "2px",
      bottom: 0,
      left: 0,
      backgroundColor: theme.palette.primary.contrastText,
      transform: "scaleX(0)",
      transition: "transform 0.25s ease",
    },
    '&:hover::before': {
      transform: "scaleX(1)",
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  linkGrid: {
    display: "flex",
    alignItems: "center",
  },
  button1: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    color: theme.palette.primary.contrastText,
    border: '2px solid white',
    transition: "all 0.3s",
    "&:hover": {
      backgroundColor: 'white',
      color: theme.palette.primary.main,
      transition: "all 0.3s",
    },
  },
  button2: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
    backgroundColor: 'white',
    border: '2px solid white',
    transition: "all 0.3s",
    "&:hover": {
      color: 'white',
      border: '2px solid white',
      transition: "all 0.3s",
    },
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const token = useSelector(selectUserToken);
  const dispatch = useDispatch();

  const handleClick = pageURL => {
    history.push(pageURL);
  }

  const handleLogoutClick = () => {
    dispatch(removeCurrentUser());
    history.push("/");
  }

  const mapOverLinksList = (list) => {
    return (
      list.map((item) => {
        const { text, pageURL } = item;
        return (
          <Link key={text} 
            className={classes.linkStyle}
            onClick={() => handleClick(pageURL)}
          >
            {text}
          </Link>
        )
      }))
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar}>
        <Toolbar>
          <Container className={classes.container} maxWidth="xl">
            <Grid item className={classes.linkGrid}>
              <Typography align="left" variant="subtitle1" className={classes.nameStyle}>
                <Link className={classes.nameStyle} href='#' onClick={() => handleClick("/")} to="/" color='inherit'>
                  KiberÖyrən
                </Link>
              </Typography>
            </Grid>
            {isMatch ? <DrawerComponent/> : ( 
              (token) ? 
                <>
                <Grid item className={classes.linkGrid}>
                    {mapOverLinksList(menuButtons)}
                  </Grid>
                  <Grid item>
                    <Button className={classes.button1}
                      onClick={() => handleClick("/profile")}>
                      PROFİL
                    </Button>
                    <Button className={classes.button2}
                      onClick={() => handleLogoutClick()}>
                      ÇIXIŞ
                    </Button>
                  </Grid>
                </>
              :
                <>
                  <Grid item className={classes.linkGrid}>
                    {mapOverLinksList(menuButtons)}
                  </Grid>
                  <Grid item>
                    {/* {mapOverList(authButtons)} */}
                    <Button className={classes.button1}
                      onClick={() => handleClick("/signup")}>
                      QEYDİYYAT
                    </Button>
                    <Button className={classes.button2}
                      onClick={() => handleClick("/signin")}>
                      DAXİL OL
                    </Button>
                  </Grid>
                </>
            )}
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};