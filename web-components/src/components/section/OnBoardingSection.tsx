import React, { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { Body } from '../typography';
import Section from './index';

interface OnBoardingSectionProps {
  title: string;
  description?: string | JSX.Element;
  headerChildren?: ReactNode;
  formContainer?: boolean; // set max width and center
  linkText?: string;
  exampleProjectUrl?: string;
  onLinkClick?: () => void;
  classes?: {
    root?: string;
    title?: string;
    titleWrap?: string;
    formWrap?: string;
  };
}

const useStyles = makeStyles()(theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(12.5, 0, 30),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(8.75, 2.5, 20),
    },
  },
  formWrap: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(140),
      margin: '0 auto',
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      flex: 'unset',
    },
    [theme.breakpoints.down('sm')]: {
      margin: 'inherit',
      flex: 1,
    },
  },
  titleWrap: {
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      maxWidth: theme.spacing(140),
    },
    [theme.breakpoints.down('sm')]: {
      margin: 'inherit',
    },
  },
  link: {
    color: theme.palette.secondary.main,
    fontFamily: theme.typography.fontFamily,
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3.5),
      marginLeft: theme.spacing(4),
    },
  },
}));

const OnBoardingSection: React.FC<
  React.PropsWithChildren<OnBoardingSectionProps>
> = ({
  formContainer = false,
  linkText,
  onLinkClick,
  exampleProjectUrl,
  classes,
  title,
  description,
  children,
  headerChildren,
}) => {
  const { classes: styles, cx } = useStyles();
  const { root, title: titleStyles, titleWrap } = styles;

  return (
    <Section
      classes={{
        root: cx(root, !!classes && classes.root),
        title: cx(titleStyles, !!classes && classes.title),
        titleWrap: cx(titleWrap, !!classes && classes.titleWrap),
      }}
      title={title}
      titleAlign={onLinkClick ? 'left' : 'center'}
      titleVariant="h3"
      description={description}
      topRight={
        onLinkClick && (
          <Link className={styles.link} onClick={onLinkClick}>
            {linkText}
          </Link>
        )
      }
      headerChildren={headerChildren}
    >
      <div
        className={cx(
          formContainer && styles.formWrap,
          !!classes && classes.formWrap,
        )}
      >
        {exampleProjectUrl && (
          <Body sx={{ pt: 2, pb: 1 }}>
            See an example{' '}
            <RouterLink to={exampleProjectUrl} target="_blank">
              project page»
            </RouterLink>
          </Body>
        )}
        {children}
      </div>
    </Section>
  );
};

export default OnBoardingSection;
