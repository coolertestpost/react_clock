import React from 'react';
import { Clock } from './components/Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  hasClock: boolean,
  clockName: string
}

export class App extends React.Component<{}, State> {
  state = {
    hasClock: false,
    clockName: 'Clock-0'
  }

  today = new Date();

  timerId = window.setInterval(() => {
    this.setState({ clockName: getRandomName() });
  }, 3300);

  handleContextMenuClick = (event: MouseEvent): void => {
    event.preventDefault();
    this.setState({ hasClock: false })
  }

  handleLeftMouseClick = (): void => {
    this.setState({ hasClock: true })
  }

  componentDidMount(): void {
    document.addEventListener('contextmenu', this.handleContextMenuClick);
    document.addEventListener('click', this.handleLeftMouseClick);
  }

  componentDidUpdate(_prevProps: Readonly<{}>, prevState: Readonly<{}>, _snapshot?: any): void {
    const prevStateTyped = prevState as State;

    console.debug(`Renamed from ${prevStateTyped.clockName} to ${this.state.clockName}`);
  }

  componentWillUnmount(): void {
    document.removeEventListener('contextmenu', this.handleContextMenuClick);
    document.removeEventListener('click', this.handleLeftMouseClick);
  }

  render() {
    const { hasClock } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>

        {hasClock && <Clock name={this.state.clockName} />}

      </div>
    );
  }
}
