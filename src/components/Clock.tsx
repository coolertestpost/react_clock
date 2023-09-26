import React from 'react';

type Props = {
  name: string
}

type State = {
  today: object
}

export class Clock extends React.PureComponent<Props, State> {
  state = {
    today: new Date(),
  }

  timerId = 0;

  componentDidMount(): void {
    this.timerId = window.setInterval(() => {
      this.setState({ today: new Date() });
    }, 1000);
  }

  componentWillUnmount(): void {
    window.clearInterval(this.timerId);
  }

  render() {
    const { today } = this.state;

    // eslint-disable-next-line no-console
    console.info(today.toUTCString().slice(-12, -4));

    const { name } = this.props;

    return (
      <div className="Clock">
        <strong className="Clock__name">
          { name }
        </strong>

        {' time is '}

        <span className="Clock__time">
          { today.toUTCString().slice(-12, -4) }
        </span>
      </div>
    )
  }
};
