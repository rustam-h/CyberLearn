import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { itemsList, loggedInItemsList } from './MenuItems';
import { useSelector  } from 'react-redux';
import { selectUserToken } from '../../redux/user/user-selectors';
import { removeCurrentUser } from '../../redux/user/user-actions';
import { useDispatch } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    closeMenuButton: {
        marginRight: 'auto',
        marginLeft: 0,
    },
    paper: {
        display: 'flex',
        background: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
    },
    menuIcon: {
        color: theme.palette.secondary.main,
    },
  }));

const DrawerComponent = () => {
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);
    const history = useHistory();
    const token = useSelector(selectUserToken);
    const dispatch = useDispatch();
    
    const handleClick = pageURL => {
        setOpenDrawer(!openDrawer);
        history.push(pageURL);
    };

    const handleDrawerToggle = () => {
        setOpenDrawer(!openDrawer);
    };

    const handleLogoutClick = () => {
        dispatch(removeCurrentUser());
        history.push("/");
    }

    const mapOverList = (list) => {      
        return (   
            list.map((item) => {
                const { text, pageURL } = item;
                return (
                    <ListItem divider button key={text} onClick={() => handleClick(pageURL)}>
                        <ListItemText primary={text} />
                    </ListItem>
                );
            })
        )
    }

    return (
        <>
            <Drawer 
                anchor='right'
                open={openDrawer} 
                onClose={()=> setOpenDrawer(false)}
                classes={{ paper: classes.paper }}
            >
                <List>
                    <IconButton color="inherit" onClick={handleDrawerToggle} className={classes.closeMenuButton}>
                        <CloseIcon/>
                    </IconButton>
                    {(token) ?
                        <div>
                            {mapOverList(loggedInItemsList)}
                            <ListItem divider button onClick={() => handleLogoutClick()}>
                                <ListItemText primary="ÇIXIŞ" />
                            </ListItem>
                        </div>
                    :
                        mapOverList(itemsList)
                    }
                </List>
            </Drawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon className={classes.menuIcon}/>
            </IconButton>
        </>
    )
}

export default DrawerComponent;