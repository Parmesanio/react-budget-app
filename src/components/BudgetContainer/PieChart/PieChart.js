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
  componentDidMount() {
    this.setData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.data.user.budget !== this.props.data.user.budget ||
      prevProps.data.budgetItems !== this.props.data.budgetItems
    ) {
      console.log("cdu fired");
      this.setData();
      this.props.data.history.push(`/${this.props.data.id}`);
    }
  }

  setData = () => {
    let data = [this.props.data.user.budget];
    let labels = ["Budget"];
    let backgroundColor = [];
    console.log(data, labels);
    this.props.data.budgetItems &&
      this.props.data.budgetItems.forEach(item => {
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
    console.log(this.props.data);

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
