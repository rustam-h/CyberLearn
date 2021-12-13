import React from 'react';
import Portal from '@material-ui/core/Portal';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles((theme) => ({
  alert: {
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
  },
}));

export default function Step({buttonName, help}) {
  const classes = useStyles();
  const [show, setShow] = React.useState(false);
  const container = React.useRef(null);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div>
        <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<HelpIcon/>}
        onClick={handleClick}
        >
        {buttonName}
      </Button>
      <div>
        {show ? (
          <Portal container={container.current}>
            {help}
          </Portal>
        ) : null}
      </div>
      <div className={classes.alert} ref={container} />
    </div>
  );
}