import React, { Component } from "react";
import { Pie, Doughnut, Bar } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData
    };
  }

  render() {
    const { type } = this.props;

    return (
      <div className="chart">
        {type === "Bar" ? (
          <Bar
            height={this.props.height}
            width={this.props.width}
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
        ) : (
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
        )}
      </div>
    );
  }
}

export default Chart;
