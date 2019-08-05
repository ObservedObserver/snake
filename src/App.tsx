import React from 'react';
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
import { Mode } from './index.d';

const WideDivider = styled(Divider)`
  margin-top: 4px;
  margin-bottom: 4px;
`;

const SpaceDiv = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  padding: 1rem;
`;

const App: React.FC = () => {
  const initMode: Mode = 'easy';
  const [mode, setMode] = React.useState(initMode);

  function handleChangeMode(event: React.ChangeEvent<unknown>) {
    setMode((event.target as HTMLInputElement).value);
  }
  return (
    <Container maxWidth="md">
      <Paper>
        <div className="App">
          <Snake length={1} playground={[[0, 0], [80, 60]]} mode={mode}></Snake>
        </div>
        <WideDivider variant="middle" />
        <SpaceDiv>
          <Button variant="contained" color="secondary">Restart</Button>
        </SpaceDiv>
        <WideDivider variant="middle" />
        <SpaceDiv>
          <FormControl component="fieldset">
            <FormLabel component="legend">Game Mode</FormLabel>
            <RadioGroup aria-label="position" name="position" value={mode} onChange={handleChangeMode} row>
              <FormControlLabel
                value="easy"
                control={<Radio color="primary" />}
                label="easy"
                labelPlacement="end"
              />
              <FormControlLabel
                value="medium"
                control={<Radio color="primary" />}
                label="Medium"
                labelPlacement="end"
              />
              <FormControlLabel
                value="hard"
                control={<Radio color="primary" />}
                label="Hard"
                labelPlacement="end"
              />
              <FormControlLabel
                value="crazy"
                control={<Radio color="primary" />}
                label="Crazy"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
        </SpaceDiv>
        
      </Paper>
 
    </Container>
  );
}

export default App;
