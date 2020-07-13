import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Popover, MenuList, Paper, Theme } from '@material-ui/core';
import DropDownIcon from '../icons/DropDownIcon';

const useStyles = makeStyles((theme: Theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  popoverContent: {
    pointerEvents: 'auto',
    marginTop: theme.spacing(1),
  },
  text: {
    '& li > a': {
      'font-family': 'lato',
      color: '#000',
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  paper: {
    'border-radius': '0px',
    border: `1px solid ${theme.palette.info.light}`,
  },
}));

interface Props {
  children: React.ReactNode;
  text: string;
  textColor?: string;
  dropdownColor?: string;
}

/**
 *
 * @param object contains text, color, children. Where text is the anchor text. Color is a string for link text color, and children are MenuItems typically with Links.
 */
const MenuHover = ({ text, textColor, dropdownColor, children }: Props): JSX.Element => {
  const [openedPopover, setOpenedPopover] = useState(false);
  const popoverAnchor = useRef(null);

  // nullish coalescing operator ?? to avoid typescript error on undefined
  const classes = useStyles({ textColor: textColor ?? '' });

  const popoverEnter = ({ currentTarget }: any): void => {
    setOpenedPopover(true);
  };

  const popoverLeave = ({ currentTarget }: any): void => {
    setOpenedPopover(false);
  };

  return (
    <div>
      <span
        ref={popoverAnchor}
        aria-owns="mouse-over-popover"
        aria-haspopup="true"
        onMouseEnter={popoverEnter}
        onMouseLeave={popoverLeave}
      >
        {text}
      </span>{' '}
      <DropDownIcon color={dropdownColor} />
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.popoverContent,
        }}
        open={openedPopover}
        anchorEl={popoverAnchor.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{ onMouseEnter: popoverEnter, onMouseLeave: popoverLeave }}
      >
        <Paper className={classes.paper}>
          <MenuList className={classes.text}>{children}</MenuList>
        </Paper>
      </Popover>
    </div>
  );
};

export default MenuHover;
