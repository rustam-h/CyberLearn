import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import QuizResult from './QuizResult';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'left',
        width: "80%",
        margin: "0 auto",
    },
    header: {
        textAlign: 'left',
        width: "80%",
        margin: "0 auto",
        fontWeight: 550,
        marginBottom: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(3, 0, 3, 0),
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
    footer: {
        marginTop: theme.spacing(2),
    },
}))

export default function Quiz({questions}) {
    const classes = useStyles();
    const size = questions.length;
    const [current, setCurrent] = useState(0);
    const [value, setValue] = React.useState('');
    const [correct, setCorrect] = useState(0);
    const [answers, setAnswers] = useState([]);

    const handleRadioChange = (event) => {
        setValue(event.target.value);
    };

    const moveNext = (event) => {
        event.preventDefault();
        const correctAnswer = questions[current].correctAnswer;
        const isCorrect = value === correctAnswer;
        setAnswers([...answers, {
            isCorrect: isCorrect,
            selectedAnswer: value,
            correctAnswer: correctAnswer,
        }])
        if (isCorrect)
            setCorrect(correct + 1);
        setCurrent(current + 1);
        setValue('');
    }

    return (
        <div>
        { size > 0 ?
        <Paper elevation={4} className={classes.paper}>
            <Typography variant="h4" className={classes.header}>Quiz</Typography>
            { ((current + 1) <= size) ? 
            <div className={classes.root}>
                <Typography>
                    <Button className={classes.button}>
                        <LiveHelpIcon fontSize="large" style={{color:"white"}}/>
                    </Button>
                    <span className={classes.questionMeta}>
                        Sual {current + 1}/{size}
                    </span>
                </Typography>
                <hr style={{marginBottom: "20px"}}/>
                <Typography variant="h5" component="h5">
                    {questions[current].question}
                </Typography>
                <div>
                <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
                {questions[current].choices.map((opt, index) => (
                    <div key={index} style={{marginTop: "5px"}}>
                    <FormControlLabel value={opt.variant} control={<Radio />} label={opt.choice} />
                    </div>
                ))}
                </RadioGroup>
                </div>
                <div className={classes.footer}>
                    <Button onClick={moveNext} 
                    variant="contained" 
                    color="primary">
                        Sonrakı
                    </Button>
                </div>
            </div>
            :
            <div>
            <QuizResult answers={answers} count={size} correct={correct} questions={questions}/>
            </div>
            }
            </Paper>
            :
            <></>
        }
        </div>
    )
}
