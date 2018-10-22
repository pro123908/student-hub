import React, { Component } from "react";
import { Pie, Doughnut } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData
    };
  }

  render() {
    return (
      <div className="chart">
        <Doughnut
          height={this.props.height}
          width={200}
          data={this.state.chartData}
          options={{
            legend: {
              display: true
            },
            layout: {
              padding: this.props.padding
            }
          }}
        />
      </div>
    );
  }
}

export default Chart;
