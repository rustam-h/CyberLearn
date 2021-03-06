import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import FeatureCard from '../../components/About/FeatureCard';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CommentIcon from '@material-ui/icons/Comment';
import DescriptionIcon from '@material-ui/icons/Description';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(17, 0, 10),
    },
    cardContent: {
        padding: theme.spacing(14, 0, 10),
    },
    container: {
        paddingLeft: '50px',
        paddingRight: '50px',
    },
    button: {
        background: theme.palette.secondary.light,
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(153, 115, 142, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    underline: {
        width: '100px',
        height: '3px',
        background: theme.palette.secondary.main,
        margin: 'auto',
    },
    margin: {
        marginTop: theme.spacing(3),
    },
    icon: {
        fontSize: '3rem',
    },
    cover: {
        width: '100%',
        paddingTop: '56.25%',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '5px',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.12)',
    },
}));

export default function About() {
    const classes = useStyles();
    const history = useHistory();

    const handleStart = () => {
        history.push("/");
    }
    const featureCardData = [
        { 
            title: "??yr??n",
            content: "D??rsl??r b??lm??sind??n ist??diyiniz m??vzunu se????r??k elektron v??saitd??n yararlan??n v?? m??qal??nin sonundak?? suallarla biliyinizi ??l????n!",
            icon: <LocalLibraryIcon className={classes.icon} />
        },
        { 
            title: "T??tbiq et",
            content: "Praktika ??v??zolunmazd??r! Tap????r??qlar hiss??sind?? kibert??hl??k??sizlikd?? ??n geni?? yay??lm???? h??cum n??vl??ri il?? ba??l?? biliyinizi t??tbiq edin!",
            icon: <AssignmentTurnedInIcon className={classes.icon}/>
        },
        { 
            title: "Fikirl??rini bildir",
            content: "Platformam??zla v?? onda t??min olunan resurslarla ba??l?? h??r hans?? irad v?? t??klifinizi feedback.cyberlearn@gmail.com ??nvan??na g??nd??rin!",
            icon: <CommentIcon className={classes.icon}/>
        },
        { 
            title: "M??qal??ni g??nd??r",
            content: "Layih??miz?? d??st??k xarakterli istifad????il??rimizl?? payla??maq ist??diyiniz kontentinizi contribute.cyberlearn@gmail.com ??nvan??na g??nd??rin!",
            icon: <DescriptionIcon className={classes.icon}/>
        },
    ]

    const mapOverList = (list) => {
        return (
            list.map((item) => {
                const { title, content, icon } = item;
                return (
                    <FeatureCard title={title} content={content} icon={icon} />
                )
            })
        )
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <div className={classes.heroContent}>
                    <Container className={classes.container}>
                    <Card elevation={0}>
                    <Grid container>
                        <Grid item xs={12} sm={8} md={6} square style={{textAlign: 'left'}}>
                        <div>
                        <CardContent>
                            <Typography component="h4" variant="h4" color="primary" style={{fontWeight: 700}} 
                            gutterBottom>
                                Kibert??hl??k??sizlik ??yr??nm?? Platformas??
                            </Typography>
                            <Typography variant="body1" color="textSecondary" style={{paddingRight: '20px'}}
                            paragraph gutterBottom>
                                Kibert??hl??k??sizlik ??yr??nm?? platformas?? istifad????il??rin?? kibert??hl??k??sizlikl?? ba??l?? ??yr??dici m??qal??l??r, testl??r v?? x??susi n??v tap????r??qlar t??qdim etm??kl?? h??r k??s ??????n t??hsil h??d??fl??yir. Haz??rda ??lk??mizd?? m??kt??bl??rd?? bu sah??nin ??saslar??n??n f??nn olaraq t??dris olunmad??????n?? n??z??r?? alsaq, layih??miz ??sas??n orta m??kt??b ??agirdl??ri ??????n n??z??rd?? tutulub. ??mumilikd??, Kibert??hl??k??sizlik ??yr??n layih??sinin m??qs??di Az??rbaycanda kibert??hl??k??sizlik sah??sind?? yeni olanlara bu sah??nin ??saslar??n?? m??xt??lif ??yr??tm?? vasit??l??ri il?? t??qdim etm??k v?? t??hsilin inki??af??n?? d??st??kl??m??kl?? r??qab??t dolu inki??af m??hiti yaratmaqd??r.
                            </Typography>
                            <Button className={classes.button} onClick={handleStart}>
                                ??ND?? BA??LA
                            </Button>
                        </CardContent>
                        </div>
                        </Grid>
                        <Grid item xs={12} sm={4} md={6}>
                            <CardMedia className={classes.cover}
                            image='/assets/image_card_2.jpg' />
                        </Grid>
                        </Grid>
                    </Card>

                    </Container>
                </div>
                <div className={classes.cardContent}>
                    <Container className={classes.container}>
                        <Grid container component="main">
                            <Grid item xs={12}>
                                <Typography 
                                    component="subtitle1" 
                                    variant="subtitle1" 
                                    color="secondary" gutterBottom
                                >
                                    ??ST??NL??KL??R??M??Z
                                </Typography>
                                <Typography 
                                    component="h4" 
                                    variant="h4" 
                                    color="primary"
                                    style={{fontWeight: 600}}
                                    gutterBottom
                                >
                                    Bizi n?? f??rql??ndirir?
                                </Typography>
                                <Divider variant="inset" className={classes.underline}/>
                            </Grid>
                                <Grid container spacing={4} className={classes.margin}>
                                    {mapOverList(featureCardData)}
                                </Grid>                
                        </Grid>
                    </Container>
                </div>
            </main>
        </React.Fragment>
    )
}