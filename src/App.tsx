import React, { useCallback } from 'react';
import Snake from './assets/snake';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { MODES } from './types';
import { MODE_SPEED } from './assets/interval';

const WideDivider = styled(Divider)`
  margin-top: 4px;
  margin-bottom: 4px;
`;

const SpaceDiv = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  padding: 1rem;
`;

const modeList = Object.keys(MODE_SPEED);

const App: React.FC = () => {
  const [mode, setMode] = React.useState(MODES.easy);

  const handleChangeMode = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMode(event.target.value as MODES);
    },
    []
  );
  return (
    <Container maxWidth="md">
      <Paper>
        <div className="App">
          <Snake
            length={1}
            playground={[
              [0, 0],
              [80, 60],
            ]}
            mode={mode}
          ></Snake>
        </div>
        <WideDivider variant="middle" />
        <SpaceDiv>
          <Button variant="contained" color="secondary">
            Restart
          </Button>
        </SpaceDiv>
        <WideDivider variant="middle" />
        <SpaceDiv>
          <FormControl component="fieldset">
            <FormLabel component="legend">Game Mode</FormLabel>
            <RadioGroup
              aria-label="position"
              name="position"
              value={mode}
              onChange={handleChangeMode}
              row
            >
              {modeList.map((mode) => (
                <FormControlLabel
                  value={mode}
                  control={<Radio color="primary" />}
                  label={mode}
                  labelPlacement="end"
                />
              ))}
            </RadioGroup>
          </FormControl>
        </SpaceDiv>
      </Paper>
    </Container>
  );
}

export default App;
