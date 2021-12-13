import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Avatar from 'react-avatar';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import { useSelector  } from 'react-redux';
import { selectUsername } from '../../redux/user/user-selectors';
import SmallCard from '../../components/Profile/SmallCard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Comment from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: theme.spacing(15),
        padding: theme.spacing(2),
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    profile: {
        borderRadius: '50%',
        marginBottom: '5px',
    },
    cardMedia: {
        marginTop: '10px',
    },
    icon: {
        fontSize: '3rem',
    },
    align: {
        fontSize: '3rem',
        verticalAlign: 'middle',
        display: 'inline-flex'
    }
}));

export default function Profile() {
  const classes = useStyles();
  const username = useSelector(selectUsername);
  const [data, setData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    score: 0,
  })


  useEffect(() => {
    axios.get('http://localhost:9000/users/' + username)
    .then(res => res.data)
    .then(details => {
      setData({
        ...data,
        firstName: details.firstName,
        lastName: details.lastName,
        score: details.score,
        username: details.username})
    })
    .catch(err => {
      console.log(err);
    })
    }, [data, username])

    return (
    <div>
        {data.username &&
        <Container component="main" maxWidth="lg">
            <Card className={classes.card} elevation={0}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={4}>
                        <CardMedia className={classes.cardMedia}>
                            <Avatar name={data.firstName + " " + data.lastName} size="200" textSizeRatio={1.2} 
                                className={classes.profile} color="#2f2fa2"/>
                            <Typography variant='h6' color='primary' gutterBottom> {data.username} </Typography>
                            <Typography variant='body1' gutterBottom> {data.firstName} {data.lastName} </Typography>
                        </CardMedia>
                    </Grid>
                    <Hidden smDown>
                        <Divider orientation="vertical" variant="middle" />
                    </Hidden>
                    <Grid item xs={12} sm={12} md={7}>
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography component="h4" variant="h4" gutterBottom color='primary'>
                                <AccountBoxIcon className={classes.align}/>
                                    İstifadəçi məlumatları
                                </Typography>
                                <Grid container spacing={5}>
                                    <SmallCard feature="Toplanmış ballar" 
                                    number={data.score} 
                                    icon={<AssignmentIcon className={classes.icon}/>}/>
                                    <SmallCard feature="Paylaşılmış postlar" 
                                    number={0}
                                    icon={<Comment className={classes.icon}/>}/>
                                </Grid>
                            </CardContent>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </Container>
        }
    </div>
    );
}