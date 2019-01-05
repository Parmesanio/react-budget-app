import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ["Budget"],
      datasets: [
        {
          data: [this.props.budget],
          backgroundColor: []
        }
      ]
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.budgetItems !== this.props.budgetItems) {
      console.log("fired");
      this.setData();
    }
  }

  setData = () => {
    let data = [...this.state.datasets[0].data];
    let labels = this.state.labels;
    let backgroundColor = [...this.state.datasets[0].backgroundColor];
    console.log(data, labels);
    this.props.budgetItems &&
      this.props.budgetItems.forEach(item => {
        data.unshift(item.amount);
        labels.unshift(item.title);
        backgroundColor.unshift(item.color);
        console.log(data, labels);
        data[data.length - 1] -= item.amount;
      });
    this.setState(({ datasets }) => ({
      labels,
      datasets: [{ data, backgroundColor }]
    }));
  };
  render() {
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
