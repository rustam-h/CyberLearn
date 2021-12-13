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
            title: "Öyrən",
            content: "Dərslər bölməsindən istədiyiniz mövzunu seçərək elektron vəsaitdən yararlanın və məqalənin sonundakı suallarla biliyinizi ölçün!",
            icon: <LocalLibraryIcon className={classes.icon} />
        },
        { 
            title: "Tətbiq et",
            content: "Praktika əvəzolunmazdır! Tapşırıqlar hissəsində kibertəhlükəsizlikdə ən geniş yayılmış hücum növləri ilə bağlı biliyinizi tətbiq edin!",
            icon: <AssignmentTurnedInIcon className={classes.icon}/>
        },
        { 
            title: "Fikirlərini bildir",
            content: "Platformamızla və onda təmin olunan resurslarla bağlı hər hansı irad və təklifinizi feedback.cyberlearn@gmail.com ünvanına göndərin!",
            icon: <CommentIcon className={classes.icon}/>
        },
        { 
            title: "Məqaləni göndər",
            content: "Layihəmizə dəstək xarakterli istifadəçilərimizlə paylaşmaq istədiyiniz kontentinizi contribute.cyberlearn@gmail.com ünvanına göndərin!",
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
                                Kibertəhlükəsizlik Öyrənmə Platforması
                            </Typography>
                            <Typography variant="body1" color="textSecondary" style={{paddingRight: '20px'}}
                            paragraph gutterBottom>
                                Kibertəhlükəsizlik Öyrənmə platforması istifadəçilərinə kibertəhlükəsizliklə bağlı öyrədici məqalələr, testlər və xüsusi növ tapşırıqlar təqdim etməklə hər kəs üçün təhsil hədəfləyir. Hazırda ölkəmizdə məktəblərdə bu sahənin əsaslarının fənn olaraq tədris olunmadığını nəzərə alsaq, layihəmiz əsasən orta məktəb şagirdləri üçün nəzərdə tutulub. Ümumilikdə, Kibertəhlükəsizlik Öyrən layihəsinin məqsədi Azərbaycanda kibertəhlükəsizlik sahəsində yeni olanlara bu sahənin əsaslarını müxtəlif öyrətmə vasitələri ilə təqdim etmək və təhsilin inkişafını dəstəkləməklə rəqabət dolu inkişaf mühiti yaratmaqdır.
                            </Typography>
                            <Button className={classes.button} onClick={handleStart}>
                                İNDİ BAŞLA
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
                                    ÜSTÜNLÜKLƏRİMİZ
                                </Typography>
                                <Typography 
                                    component="h4" 
                                    variant="h4" 
                                    color="primary"
                                    style={{fontWeight: 600}}
                                    gutterBottom
                                >
                                    Bizi nə fərqləndirir?
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