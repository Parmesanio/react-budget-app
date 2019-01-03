import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: []
        }
      ]
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setData();
    }
  }
  setData = () => {
    console.log("fired");

    let data = [];
    let labels = [];
    let backgroundColor = [];
    this.props.budgetItems.forEach(item => {
      data.push(item.amount);
      labels.push(item.title);
      backgroundColor.push(item.color);
    });
    this.setState(({ datasets }) => ({
      labels,
      datasets: [{ data, backgroundColor }]
    }));
  };
  render() {
    console.log(this.props, this.state);
    return (
      <div>
        <Pie
          data={this.state}
          height={200}
          width={30}
          options={{
            legend: {
              display: false
            },
            cutoutPercentage: 50,
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}

export default PieChart;
