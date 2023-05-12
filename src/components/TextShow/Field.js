import { Grid, Typography } from '@mui/material';
import React from 'react'

function Field({ variant, label, value, size }) {
    return (
      <Grid item xs={size}>
        <Typography 
          style={{
            display: "inline-block",
            maxWidth: "100%",
            wordWrap: "break-word",
          }}
          variant={variant}
          gutterBottom
        >
          {label} : {value}
        </Typography>
      </Grid>
    );
  }

export default Field