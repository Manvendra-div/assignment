import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const CustomChart = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["0"],
      },
    },
    series: [
      {
        name: "series-1",
        data: [0],
      },
    ],
  });
  useEffect(() => {
    const getData = async () => {
      const hotelRequests = {};
      const hotelNames = [];
      const response = await axios.get(
        "https://checkinn.co/api/v1/int/requests"
      );
      response.data.requests.forEach((entity) => {
        const hotelName = entity.hotel.name;
        if (hotelRequests[hotelName]) {
          hotelRequests[hotelName]++;
        } else {
          hotelRequests[hotelName] = 1;
          hotelNames.push(hotelName);
        }
      });
      const intRequestCount = hotelNames.map(
        (hotelName) => hotelRequests[hotelName]
      );
      setChartData({
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: hotelNames,
          },
        },
        series: [
          {
            name: "series-1",
            data: intRequestCount,
          },
        ],
      });
    };
    getData();
  }, []);

  return (
    <div>
      <Chart
        options={chartData?.options}
        series={chartData?.series}
        type="line"
        width="500"
      />
    </div>
  );
};

export default CustomChart;
