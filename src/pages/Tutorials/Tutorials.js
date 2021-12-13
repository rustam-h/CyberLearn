import React, { useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TutorialCard from '../../components/Tutorial/TutorialCard'
import { TutorialContext } from '../../contexts/TutorialContext';
import Progress from '../../components/Progress';

const useStyles = makeStyles((theme) => ({
  icon: {
      marginRight: theme.spacing(2),
  },
  heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(16, 0, 6),
  },
  cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
  },
}));

export default function Tutorials() {
    const classes = useStyles();
    const { tutorialsList } = useContext(TutorialContext);
    return (
    <React.Fragment>
      <Progress list={tutorialsList} />
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Dərslər
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Bu hissədə bütün dərsləri görə bilərsiniz. Hal hazırda dərslər Şəbəkənin Əsasları və OWASP Top 10 siyahısındakı
              boşluqları əhatə edir.
            </Typography>
          </Container>
        </div>
          <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={4}>
              {tutorialsList.length !== 0 &&
                  tutorialsList.map(tutorial => (
                    <TutorialCard tutorial={tutorial}/>
              ))}
            </Grid>
          </Container>
      </main>
    </React.Fragment>
  );
}