import React from 'react';
import { Grid, Typography } from '@mui/material';
import styles from './StatsTile.module.scss';

type StatsTilePorps = {
  title: React.ReactNode;
  summary: React.ReactNode;
  children: React.ReactNode;
  dataTestId: string;
};

export const StatsTile = ({ title, summary, children, dataTestId }: StatsTilePorps) => {
  return (
    <Grid
      data-testid={dataTestId}
      xs={12}
      item
      className={styles.optionCard}
      padding={{ md: '30px', xs: '20px' }}
    >
      <Grid
        container
        spacing={0}
        direction="column"
        gap="10px"
      >
        <Typography
          variant="h5"
          className={styles.optionTitle}
          data-testid="tile-title"
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontSize: { md: '40px', xs: '28px' },
            lineHeight: { md: '47px', xs: '32px' },
          }}
          className={styles.optionSummary}
          data-testid="tile-summary"
        >
          {summary}
        </Typography>
      </Grid>
      {children}
    </Grid>
  );
};
