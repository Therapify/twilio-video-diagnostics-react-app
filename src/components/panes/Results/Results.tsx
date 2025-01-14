import { Button, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { CheckMark } from '../../../icons/CheckMark';
import { DownloadIcon } from '../../../icons/DownloadIcon';
import { SmallError } from '../../../icons/SmallError';
import { ActivePane, useAppStateContext } from '../../AppStateProvider/AppStateProvider';
import { getQualityScore } from '../Quality/getQualityScore/getQualityScore';
import { QualityScore } from '../Quality/Quality';

const useStyles = makeStyles({
  resultContainer: {
    marginTop: '2em',
    '&:not(:last-child)': {
      paddingBottom: '2em',
      borderBottom: '0.1em solid #8891AA',
    },
  },
  iconContainer: {
    display: 'flex',
    '& svg': {
      margin: '0.2em 0.8em 0 0',
    },
  },
  downloadButton: {
    marginRight: '1.5em',
    '& svg': {
      position: 'relative',
      left: '-5px',
    },
  },
});

export function Results() {
  const { state, downloadFinalTestResults, dispatch } = useAppStateContext();
  const { totalQualityScore } = getQualityScore(state.preflightTest.report, state.bitrateTest.report);
  const classes = useStyles();

  const testsPassed = totalQualityScore === QualityScore.Excellent || totalQualityScore === QualityScore.Good;
  // const qualityScore = QualityScore[totalQualityScore].toLowerCase();

  return (
    <>
      <Container>
        <Grid container justifyContent="space-between">
          <Typography variant="h1" gutterBottom>
            {testsPassed ? 'All tests passed!' : 'Some tests failed'}
          </Typography>

          {testsPassed ? (
            <Typography variant="body1" gutterBottom>
              As far as we can tell, your video should be working. If you're still experiencing issues, download your
              report results and send to your network administrator.
            </Typography>
          ) : (
            <Typography variant="body1" gutterBottom>
              <strong>One out of three </strong>
              tests failed – use this list to solve common video issues and restart the test. If you can’t easily solve
              the problem(s), download report results and send to your network administrator.
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            className={classes.downloadButton}
            onClick={downloadFinalTestResults}
          >
            <DownloadIcon />
            Download report results
          </Button>
          <Button
            variant="outlined"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#8891AA' }}
            onClick={() => window.location.reload()}
          >
            Restart test
          </Button>

          <div className={classes.resultContainer}>
            <div className={classes.iconContainer}>
              <CheckMark />
              <Typography variant="h3" gutterBottom>
                Device &amp; Network Setup
              </Typography>
            </div>
            <Typography variant="body1" gutterBottom>
              Audio and video successfully received from your hardware and browser.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => dispatch({ type: 'set-active-pane', newActivePane: ActivePane.CameraTest })}
              style={{ marginRight: '1.5em' }}
            >
              Review hardware
            </Button>
            <Button
              variant="outlined"
              onClick={() => dispatch({ type: 'set-active-pane', newActivePane: ActivePane.BrowserTest })}
            >
              Review browser
            </Button>
          </div>
        </Grid>
      </Container>
    </>
  );
}
