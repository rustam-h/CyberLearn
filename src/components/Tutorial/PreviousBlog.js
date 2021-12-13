import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { Popover, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(8, 0, 8, 0),
    },
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
    popover: {
        pointerEvents: 'none',
    },
}));


const PreviousBlog = ({tutorial, bool}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();


    const handleClick = () => {
        history.push(`/tutorial/${tutorial._id}`);
        window.location.reload();
    }

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    return (
        <div className={classes.root}>
        {tutorial.images && 
            <div>
                <Button 
                    disabled={bool}
                    variant="contained"
                    color="secondary"
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                    onClick={handleClick}
                >
                    <NavigateBeforeIcon />
                    ƏVVƏLKİ DƏRS
                </Button>
                <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <CardActionArea>
                        <Card className={classes.card}>
                            <div className={classes.cardDetails}>
                                <CardContent>
                                    <Typography component="h2" variant="h5">
                                        {tutorial.title}
                                    </Typography>
                                    <Typography variant="subtitle1" paragraph>
                                        {tutorial.description}
                                    </Typography>
                                </CardContent>
                            </div>
                            <Hidden xsDown>
                                <CardMedia className={classes.cardMedia} image={tutorial.images[0]} />
                            </Hidden>
                        </Card>
                    </CardActionArea>
                </Popover>
            </div>
        }
        </div>
    );
};

export default PreviousBlog;