// @flow
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { styled } from '@mui/material/styles';
import { AccountCircle } from "@mui/icons-material";
import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PREFIX = 'Profile';

const classes = {
  root: `${PREFIX}-root`,
  menu: `${PREFIX}-menu`,
  menuButton: `${PREFIX}-menuButton`,
  title: `${PREFIX}-title`,
  avatar: `${PREFIX}-avatar`,
  listItemText: `${PREFIX}-listItemText`,
  listItem: `${PREFIX}-listItem`
};

const StyledLink = styled(Link)((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {
    // margin: "0 auto 0 0",
  },

  [`& .${classes.menu}`]: {
    direction: theme.direction,
  },

  [`& .${classes.menuButton}`]: {
    marginRight: theme.spacing(2),
  },

  [`& .${classes.title}`]: {
    flexGrow: 1,
  },

  [`& .${classes.avatar}`]: {
    "&:focus": {
      border: "none",
    },
    textAlign: "center",
    justifyContent: "center",
    boxShadow: "none",
    width: "250px",
    borderBottom: "1px solid #00000054",
    borderRadius: "0",
    padding: theme.spacing(2),
  },

  [`& .${classes.listItemText}`]: {
    "& span": {
      fontSize: "16px",
      fontWeight: "bold",
    },
  },

  [`& .${classes.listItem}`]: {
    height: 45,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  }
}));

const Profile = (props) => {

  const { profileData } = props;

  return (
    <StyledLink to="/admin/profile">
      <ListItem className={classes.listItem}>
        <ListItemIcon>
          <AccountCircle color="action" sx={{ fontSize: 35 }} />
        </ListItemIcon>
        <ListItemText
          className={classes.listItemText}
          primary={profileData.account?.name ?? profileData.username}
        />
      </ListItem>
    </StyledLink>
  );
};

Profile.propTypes = {
  logOut: PropTypes.func,
};

export default Profile;
