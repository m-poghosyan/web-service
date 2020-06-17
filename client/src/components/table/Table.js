import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchData } from '../../redux/data-table/data-table-actions';
import ChartData from '../chart-data/ChartData';

import { connect } from 'react-redux';
import './table.css';

const Table = (props) => {
  const { fetchData, data } = props;
  const getChartData = (data, type) => {
    return data?.map((item) => +item.stocks[type]);
  };
  const tableData = {
    labels: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
    ],
    datasets: [
      {
        label: 'CAC40',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(95,22,92,0.4)',
        borderColor: 'rgba(75,172,12,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,172,12,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,172,12,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: getChartData(data, 'CAC40'),
      },
      {
        label: 'NASDAQ',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,12,102,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: getChartData(data, 'NASDAQ'),
      },
    ],
  };

  useEffect(() => {
    if (props.isEditable) {
      return;
    }
    const interval = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(interval);
  }, [fetchData, props.isEditable]);

  return (
    <div>
      <Line data={tableData} height={90} />
      <table className='table'>
        <thead>
          <ChartData data={data} type='CAC40' />
          <ChartData data={data} type='NASDAQ' />
        </thead>
      </table>
    </div>
  );
};

const mapStateToProps = ({
  dataTableReducer: { data, isLoading, isEditable },
}) => ({
  data,
  isLoading,
  isEditable,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
