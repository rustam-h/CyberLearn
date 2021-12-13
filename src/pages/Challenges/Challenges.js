import React, { useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ChallengeCard from '../../components/Challenge/ChallengeCard';
import Progress from '../../components/Progress';
import { ChallengeContext } from '../../contexts/ChallengeContext';


const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(16, 0, 6),
  },

  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function Challenges() {
  const classes = useStyles();
  const { challengesList } = useContext(ChallengeContext);
  return (
    <React.Fragment>
      <Progress list={challengesList} />
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Məsələlər
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Bu hissədə bütün məsələləri görə bilərsiniz.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={4}>
            {challengesList.length !== 0 &&
              challengesList.map(challenge => (
                <ChallengeCard challenge={challenge}/>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}