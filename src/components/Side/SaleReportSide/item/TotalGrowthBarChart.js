import { useEffect, useState } from "react";

// material-ui
import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// third-party
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";

// project imports
import MainCard from "../ui-component/cards/MainCard";
import SkeletonTotalGrowthBarChart from "../ui-component/cards/Skeleton/TotalGrowthBarChart";
// chart data
import { chartData, chartData2, chartData3 } from "./chart-data/total-growth-bar-chart";
const gridSpacing = 3;

const status = [
  {
    value: "today",
    label: "Today",
  },
  {
    value: "month",
    label: "This Month",
  },
  {
    value: "year",
    label: "This Year",
  },
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading }) => {
  const [value, setValue] = useState("today");
  const theme = useTheme();

  const { primary } = theme.palette.text;
  const darkLight = "#eef2f6";
  const grey200 = "#E3E8EF";
  const grey500 = "#697586";

  const primary200 = "#90caf9";
  const primaryDark = "#1e88e5";
  const secondaryMain = "#673ab7";
  const secondaryLight = "#ede7f6";

  useEffect(() => {
    const newChartData = {
      ...chartData2.options,
      colors: [primary200, primaryDark, secondaryMain, secondaryLight],
      xaxis: {
        labels: {
          style: {
            colors: [
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
            ],
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary],
          },
        },
      },
      grid: {
        borderColor: grey200,
      },
      tooltip: {
        theme: "light",
      },
      legend: {
        labels: {
          colors: grey500,
        },
      },
    };

    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, "updateOptions", newChartData);
    }
  }, [
    primary200,
    primaryDark,
    secondaryMain,
    secondaryLight,
    primary,
    darkLight,
    grey200,
    isLoading,
    grey500,
  ]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">Total Growth</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3">$2,324.00</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField
                    id="standard-select-currency"
                    select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  >
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {value === "month" ? (
                <Chart {...chartData2} />
              ) : value === "year" ? (
                <Chart {...chartData} />
              ) : (
                <Chart  {...chartData3} />
              )}
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

export default TotalGrowthBarChart;
