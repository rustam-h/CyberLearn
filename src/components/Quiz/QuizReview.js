import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import Grid from '@material-ui/core/Grid';
import QuizResult from './QuizResult';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import './QuizReview.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        margin: '0 auto',
        textAlign: 'left',
    },
    button:{
        pointerEvents: "none",
        boxShadow: "none",
        background: theme.palette.secondary.light,
        width: 60,
        height: 60,
        borderRadius: '50%',        
    },
    questionMeta: {
        marginLeft: 10,
        display: "inline"
    },
    options: {
        flexGrow: 1,
        overflow: 'hidden',
    },
    message: {
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        textTransform: 'none',
        whiteSpace: 'nowrap',
        padding: '1px 5px',
        fontSize: '1rem',
    }
}))

export default function QuizReview({questions, answers, count, correct}) {
    const classes = useStyles();
    const [review, setReview] = useState(true);
    const percent = Math.round(correct*100/count);

    const mapOverOptions = (question, i) => {
        return (
        question.choices.map((opt, index) => {
            const handler = handleSelect(opt.variant, i);
            return (
            <div key={index} style={{ width: '100%'}}>
            <Button variant="contained" 
            className={`option ${handler}`} >
            <Grid container wrap="nowrap" spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
                <div style={{width: '20px', display: 'flex', justifyContent: 'center', alignItems: "center"}}>
                {handler === 'correctAnswer' ? 
                <CheckIcon style={{color: '#4CAF50'}}/>
                : handler === 'wrongAnswer' ?
                <CloseIcon style={{color: '#dc3545'}} />
                : <></>}
                </div>
            </Grid>
            <Grid item xs>
                <Typography align="left">{opt.choice}</Typography>
            </Grid>
            <Grid item>
                {(handler === 'correctAnswer' || handler === 'wrongAnswer') ?
                <Button variant="contained" size="small" className={classes.message}>Sənin cavabın</Button>
                : handler === 'notSelected' ?
                <Button variant="contained" size="small" className={classes.message}>Doğru cavab</Button>
                : <></>}
            </Grid>
            </Grid>
            </Button>
            </div>
        )}))
    }

    const handleSelect = (choice, index) => {
        var answer = answers[index];
        const {isCorrect, selectedAnswer, correctAnswer} = answer;
        if (choice === selectedAnswer) {
            if (isCorrect === true)
                return 'correctAnswer'
            else
                return 'wrongAnswer'
        }
        if (choice === correctAnswer) {
            return 'notSelected'
        }
    }

    return (
        <div>
        { (review) ?
        <div className={classes.root}>
            <Typography variant="h6" gutterBottom>{percent}% Düzgün:</Typography>
            { questions.map((question, i) => (
            <div key={i}>
            <Typography variant="h5" gutterBottom style={{marginTop: '10px'}}>
                <Button className={classes.button}>
                    <LiveHelpIcon fontSize="large" style={{color:"white"}}/>
                </Button>
                <span className={classes.questionMeta}>
                    Sual {i+1}:
                </span>
            </Typography>
            <Typography variant="h6" component="h6">
                {question.question}
            </Typography>
            <div className={classes.options}>
                {mapOverOptions(question, i)}
            </div>
            </div>
            ))}
            <Button variant="contained" color="primary"
            onClick={() => setReview(false)} style={{margin: '0 auto', display: "flex", marginTop: '20px'}}>BAXIŞI BİTİR</Button>
        </div>
        :
        <QuizResult answers={answers} count={count} correct={correct} questions={questions}/>
        }
        </div>
    )
}
