import React, {useState} from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import QuizReview from './QuizReview';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center'
    }
}))

export default function QuizResult({answers, count, correct, questions}) {
    const classes = useStyles();
    const percent = Math.round(correct*100/count);
    const [result, setResult] = useState(true);

    return (
        <div className={classes.root}>
        {(result) ?
        <div>
            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={12}>
                <Typography component="h1" variant="h4">Nəticə:</Typography>
                </Grid>
                <Grid item xs={12}>
                <div style={{ width: 200, height: 200}}>
                    <CircularProgressbar value={percent} text={`${percent}%`} 
                        styles={buildStyles({
                            pathColor: "#2f2fa2",
                            textColor: '#242582'
                        })}
                    />
                </div>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="h6">{correct}/{count}</Typography>
                </Grid>
                <Grid item xs={12}>
                { (percent === 100) ?
                <Typography variant="subtitle1">Təbriklər! Belə davam et!</Typography>
                :
                <Typography variant="subtitle1">Daha çox çalışmalısan!</Typography>
                }
                </Grid>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" color="secondary" onClick={() => setResult(false)}>Cavablarını yoxla</Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" color="secondary" onClick={() => window.location.reload()}>YENİDƏN CƏHD ET</Button>
                </Grid>
                </Grid>
            </Grid>
        </div>
        :
        <div>
            <QuizReview questions={questions} answers={answers} count={count} correct={correct}/>
        </div>
        }
    </div>
    )
}