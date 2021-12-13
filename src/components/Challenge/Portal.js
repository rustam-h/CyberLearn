import React from 'react';
import Portal from '@material-ui/core/Portal';
import { makeStyles } from '@material-ui/core/styles';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import Button from '@material-ui/core/Button';
import SimpleAccordion from './Accordion';

const useStyles = makeStyles((theme) => ({
  alert: {
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
  },
}));

export default function SimplePortal() {
  const classes = useStyles();
  const [show, setShow] = React.useState(false);
  const container = React.useRef(null);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div>
        <Button
        variant="contained"
        color="secondary"
        size="large"
        startIcon={<WbIncandescentIcon/>}
        onClick={handleClick}
        >
        İpucu
      </Button>
      <div>
        {show ? (
          <Portal container={container.current}>
            <SimpleAccordion/>
          </Portal>
        ) : null}
      </div>
      <div className={classes.alert} ref={container} />
    </div>
  );
}