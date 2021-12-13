import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Grid, Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { menuButtons } from './MenuItems';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useSelector  } from 'react-redux';
import { selectUserToken } from '../../redux/user/user-selectors';
import { removeCurrentUser } from '../../redux/user/user-actions';
import { useDispatch } from 'react-redux';
import DrawerComponent from './DrawerComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  appbarTransparent: {
    backgroundColor: 'rgba(0, 62, 50, 0)',
    transition: "all 0.3s",
  },
  appbarSolid: {
    backgroundColor: theme.palette.secondary.contrastText,
    transition: "all 0.3s",
  },
  buttonTransparent: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    color: theme.palette.primary.contrastText,
    transition: "all 0.3s",
  },
  buttonSolid: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
    transition: "all 0.3s",
  },
  nameStyleTransparent: {
    fontSize: '1.2rem',
    fontFamily: 'Noto Serif',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
    transition: "all 0.3s",
  },
  nameStyleSolid: {
    fontSize: '1.2rem',
    fontFamily: 'Noto Serif',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: theme.palette.primary.light,
    transition: "all 0.3s",
  },
  linkStyleTransparent: {
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
  linkStyleSolid: {
    position: "relative",
    display: "inline-block",
    textDecoration: "none",
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: "2px",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    paddingBottom: "4px",
    color: theme.palette.primary.main,
    transition: "all 0.3s",
    '&::before': {
      content: "''",
      position: "absolute",
      display: "block",
      width: "100%",
      height: "2px",
      bottom: 0,
      left: 0,
      backgroundColor: theme.palette.primary.main,
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
  button1Transparent: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    color: theme.palette.primary.contrastText,
    border: '2px solid white',
    transition: "all 0.3s",
    "&:hover": {
      backgroundColor: theme.palette.primary.contrastText,
      color: theme.palette.primary.light,
      transition: "all 0.3s",
    },
  },
  button2Transparent: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.primary.contrastText,
    border: '2px solid white',
    transition: "all 0.3s",
    "&:hover": {
      color: theme.palette.primary.contrastText,
      border: '2px solid',
      borderColor: theme.palette.primary.contrastText,
      transition: "all 0.3s",
    },
  },
  button1Solid: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    color: theme.palette.secondary.main,
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
    transition: "all 0.3s",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.contrastText,
      transition: "all 0.3s",
    },
  },
  button2Solid: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText,
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
    transition: "all 0.3s",
    "&:hover": {
      backgroundColor: theme.palette.primary.contrastText,
      color: theme.palette.secondary.main,
      transition: "all 0.3s",
    },
  },
}));

export default function HomePageAppBar() {
  const classes = useStyles();
  const history = useHistory();
  
  // style for Appbar
  const [navBackground, setNavBackground] = useState('appbarTransparent');
  const navRef = useRef();
  navRef.current = navBackground;
  // style for website name
  const [nameStyle, setNameStyle] = useState('nameStyleTransparent');
  const nameRef = useRef();
  nameRef.current = nameStyle;
  //style for menu links (about, tutorials, lessons)
  const [linkStyle, setLinkStyle] = useState('linkStyleTransparent');
  const linkRef = useRef();
  linkRef.current = linkStyle;
  // style for first button
  const [button1Style, setButton1Style] = useState('button1Transparent');
  const button1Ref = useRef();
  button1Ref.current = button1Style;
  //style for second button
  const [button2Style, setButton2Style] = useState('button2Transparent');
  const button2Ref = useRef();
  button2Ref.current = button2Style;
  
  
  const theme = useTheme();
  const token = useSelector(selectUserToken);
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50
      if (show) {
        setNavBackground('appbarSolid');
        setNameStyle('nameStyleSolid');
        setLinkStyle('linkStyleSolid');
        setButton1Style('button1Solid');
        setButton2Style('button2Solid');
      } else {
        setNavBackground('appbarTransparent');
        setNameStyle('nameStyleTransparent');
        setLinkStyle('linkStyleTransparent');
        setButton1Style('button1Transparent');
        setButton2Style('button2Transparent');
      }
    }
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    }
  })

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
            className={classes[linkRef.current]}
            onClick={() => handleClick(pageURL)}
          >
            {text}
          </Link>
        )
      }))
  }

  return (
    <div className={classes.root} id="header">
      <AppBar className={classes[navRef.current]} elevation={0}>
        <Toolbar>
          <Container className={classes.container} maxWidth="xl">
            <Grid item className={classes.linkGrid}>
              <Typography variant="subtitle1" className={classes[nameRef.current]}>
                <Link className={classes[nameRef.current]} href='#' onClick={() => handleClick("/")} to="/">
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
                    <Button className={classes[button1Ref.current]}
                      onClick={() => handleClick("/profile")}>
                      PROFİL
                    </Button>
                    <Button className={classes[button2Ref.current]}
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
                    <Button className={classes[button1Ref.current]}
                      onClick={() => handleClick("/signup")}>
                      QEYDİYYAT
                    </Button>
                    <Button className={classes[button2Ref.current]}
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
}