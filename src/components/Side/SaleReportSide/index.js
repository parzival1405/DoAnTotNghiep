import { useEffect, useState } from "react";
// material-ui
import { Grid } from "@mui/material";

// project imports
import EarningCard from "./item/EarningCard";
import PopularCard from "./item/PopularCard";
import TotalOrderLineChartCard from "./item/TotalOrderLineChartCard";
import TotalIncomeDarkCard from "./item/TotalIncomeDarkCard";
import TotalIncomeLightCard from "./item/TotalIncomeLightCard";
import TotalGrowthBarChart from "./item/TotalGrowthBarChart";

const gridSpacing = 3;

function SaleReportSide() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div style={{maxHeight:"650px",overflow:"scroll",padding:"5px"}}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <EarningCard isLoading={isLoading} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <TotalOrderLineChartCard isLoading={isLoading} />
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <TotalIncomeDarkCard isLoading={isLoading} />
                </Grid>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <TotalIncomeLightCard isLoading={isLoading} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={8}>
              <TotalGrowthBarChart isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={4}>
              <PopularCard isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default SaleReportSide;
