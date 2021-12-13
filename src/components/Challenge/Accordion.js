import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useParams } from 'react-router-dom';
import { ChallengeContext } from '../../contexts/ChallengeContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '10%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();
  const { id } = useParams();
  const { challengesList } = useContext(ChallengeContext);
  const challenge = challengesList.find(obj =>  obj._id === id);

  const mapOverList = (list) => {
    return (
      list.map((element, index) => {
        const { header, hint } = element;
        return (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={classes.heading}>{index + 1}</Typography>
              <Typography className={classes.secondaryHeading}>{header}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {hint}
              </Typography>
            </AccordionDetails>
          </Accordion>
        )
      }))
  }

  return (
    <div className={classes.root}>
      {mapOverList(challenge.hints)}
    </div>
  );
}