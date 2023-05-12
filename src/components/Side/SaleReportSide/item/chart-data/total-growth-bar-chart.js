// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //

export const chartData = {
  height: 480,
  type: "bar",
  options: {
    chart: {
      id: "bar-chart",
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ],
    },
    legend: {
      show: true,
      fontSize: "14px",
      fontFamily: `'Roboto', sans-serif`,
      position: "bottom",
      offsetX: 20,
      labels: {
        useSeriesColors: false,
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5,
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8,
      },
    },
    fill: {
      type: "solid",
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
    },
  },
  series: [
    {
      name: "Đầu tư",
      data: [
        350000, 1250000, 350000, 350000, 350000, 800000, 350000, 200000, 350000,
        450000, 150000, 750000,
      ],
    },
    {
      name: "Mất mát",
      data: [
        350000, 150000, 150000, 350000, 650000, 400000, 800000, 250000, 150000,
        850000, 250000, 750000,
      ],
    },
    {
      name: "Lợi nhuận",
      data: [
        350000, 1450000, 350000, 350000, 200000, 1050000, 1000000, 100000,
        650000, 450000, 300000, 100000,
      ],
    },
  ],
};

// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //

export const chartData2 = {
  height: 480,
  type: "bar",
  options: {
    chart: {
      id: "bar-chart",
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ],
    },
    legend: {
      show: true,
      fontSize: "14px",
      fontFamily: `'Roboto', sans-serif`,
      position: "bottom",
      offsetX: 20,
      labels: {
        useSeriesColors: false,
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5,
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8,
      },
    },
    fill: {
      type: "solid",
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
    },
  },
  series: [
    {
      name: "Đầu tư",
      data: [
        350000, 1250000, 350000, 350000, 350000, 800000, 350000, 200000, 350000,
        450000, 150000, 350000, 1250000, 350000, 350000, 350000, 800000, 350000,
        200000, 350000, 450000, 350000, 1250000, 350000, 350000, 350000, 800000,
        350000, 200000, 350000, 450000,
      ],
    },
    {
      name: "Mất mát",
      data: [
        350000, 150000, 150000, 350000, 650000, 400000, 800000, 250000, 150000,
        850000, 250000, 350000, 150000, 150000, 350000, 650000, 400000, 800000,
        250000, 150000, 850000, 350000, 150000, 150000, 350000, 650000, 400000,
        800000, 250000, 150000, 850000,
      ],
    },
    {
      name: "Lợi nhuận",
      data: [
        350000, 1450000, 350000, 350000, 200000, 1050000, 1000000, 100000,
        650000, 450000, 350000, 1450000, 350000, 350000, 200000, 1050000,
        1000000, 100000, 650000, 450000, 350000, 1450000, 350000, 350000,
        200000, 1050000, 1000000, 100000, 650000, 450000, 450000,
      ],
    },
  ],
};

export const chartData3 = {
  series: [44, 55, 13],
  type:"pie", 
  height:523,
  options: {
    chart: {
      type: "pie",
      height:480,
    },
    labels: ["Đầu tư", "Mất mát", "Lợi nhuận"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  },
};
