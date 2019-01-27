import React, { Component } from 'react';
import { HorizontalBar } from "react-chartjs-2";

class HorizontalBarChart extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         itemAmount: this.props.itemAmount,
    //         budget: this.props.user.budget,
    //         limit: 100
    //     }
    // }
    state = {
        itemSpent: this.props.itemSpent,
        itemAmount: this.props.itemAmount,
        limit: 100
    }
    // BUG: this.state.itemAmount not updating
    render() {
        console.log(this.props.itemSpent, this.state.itemAmount, this.state.limit, this.props);

        return (
            <HorizontalBar
                height={10}
                data={{
                    datasets: [{
                        label: this.props.itemTitle,
                        data: [Math.ceil((this.state.itemSpent / this.state.itemAmount) * 100)],
                        backgroundColor: Math.ceil((this.state.itemSpent / this.state.itemAmount) * 100) < 40 ? 'green' : Math.ceil((this.state.itemSpent / this.state.itemAmount) * 100) < 70 ? 'yellow' : 'red'
                    }, { label: this.props.itemTitle, data: [this.state.limit], backgroundColor: "lightgrey" }]
                }}
                options={{
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            display: false,//this will remove all the x-axis grid lines
                            stacked: true,
                            ticks: {
                                beginAtZero: true,
                                min: 0,
                                max: 100
                            }
                        }],
                        yAxes: [{
                            stacked: true,
                            display: false //this will remove all the y-axis grid lines
                        }]
                    },

                }} />
        );
    }
}

export default HorizontalBarChart;