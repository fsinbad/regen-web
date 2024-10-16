import React from 'react';
import Slider from 'react-slick';
import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from 'tss-react/mui';

import ResourcesCard, { ResourcesCardProps } from '../cards/ResourcesCard';

export interface ResourceCardsProps {
  items: ResourcesCardProps[];
  imageClassName?: string;
  className?: string;
  target?: string;
  draftText: string;
  updatedLabel: string;
}

const useStyles = makeStyles()((theme: Theme) => ({
  slider: {
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    },
    '& .slick-list': {
      [theme.breakpoints.down('lg')]: {
        overflow: 'visible',
      },
    },
    '& .slick-track': {
      display: 'flex',
      '& .slick-slide': {
        height: 'inherit',
        [theme.breakpoints.down('sm')]: {
          paddingRight: theme.spacing(4.125),
          '&:last-child': {
            paddingRight: 0,
          },
        },
        '& > div:first-child': {
          height: '100%',
        },
      },
    },
  },
  item: {
    height: 'inherit',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '50%',
      paddingRight: theme.spacing(5.25),
      paddingBottom: theme.spacing(5.25),
    },
  },
}));

export default function ResourceCards({
  items,
  className,
  target = '_blank',
  draftText,
  updatedLabel,
}: ResourceCardsProps): JSX.Element {
  const theme = useTheme();
  const { classes, cx } = useStyles();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const tablet = useMediaQuery(theme.breakpoints.up('sm'));
  let slides;
  if (desktop) slides = 2;
  if (mobile) slides = 1;
  if (tablet) slides = 2;

  const settings = {
    infinite: false,
    speed: 500,
    // slidesToShow: slides,
    // slidesToScroll: slides,
    initialSlide: 0,
    arrows: false,
    rows: 1,
    slidesPerRow: slides,
  };
  return (
    <div className={classes.slider}>
      {!desktop ? (
        <Slider {...settings} className={cx(className, classes.slider)}>
          {items.map((item, index) => (
            <div key={index} className={classes.item}>
              <ResourcesCard
                image={item.image}
                title={item.title}
                updated={item.updated}
                description={item.description}
                buttonText={item.buttonText}
                link={item.link}
                target={target}
                updatedLabel={updatedLabel}
                draftText={draftText}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <Grid container>
          {items.map((item, index) => (
            <Grid
              item
              xs={4}
              md={5}
              lg={4}
              key={index}
              className={classes.item}
            >
              <ResourcesCard
                image={item.image}
                title={item.title}
                updated={item.updated}
                description={item.description}
                buttonText={item.buttonText}
                link={item.link}
                target={target}
                draftText={draftText}
                updatedLabel={updatedLabel}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
