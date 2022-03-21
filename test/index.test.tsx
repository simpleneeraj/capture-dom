import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Capture } from '../src/index';

describe('it', () => {
  it('This liberary renders without crashing', () => {
    const div = document.createElement('div');
    const App:React.FC=()=>{
      return <Capture>
        <h1>Hello World</h1>
      </Capture>;
    }

    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
