import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { alpha, makeStyles } from "@material-ui/core/styles";
import Paper from "@mui/material/Paper";
import { AppBar, Grid, Toolbar } from "@material-ui/core";
import { IconButton, Typography } from "@mui/material";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/MailOutline";
import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";

//#region
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
//#endregion

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import style from "../theme/style/Components/Navbar";

const useStyles = makeStyles(style);

function Bar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  //¡container
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  //¡paper
  const [checked, setChecked] = React.useState(false);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };
  return (
    <Grid className={classes.navbarMain}>
      <div className={classes.grow}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='open drawer'
            >
              <div className={classes.div}>
                {["left"].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                      <MenuIcon />
                    </Button>
                    <SwipeableDrawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                      onOpen={toggleDrawer(anchor, true)}
                    >
                      {list(anchor)}
                    </SwipeableDrawer>
                  </React.Fragment>
                ))}
              </div>
            </IconButton>
            <Typography className={classes.title} variant='h6' noWrap>
              charly
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.grow} />

            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='primary-search-account-menu'
                aria-haspopup='true'
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <container sx={{ p: 2 }} className={classes.containerClasses}>
        <Grid
          className={classes.mainContainer}
          container
          spacing={3}
          direction='row'
          justifyContent='center'
        >
          <Grid container className={classes.middleInputs}>
            <div>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1bh-content'
                  id='panel1bh-header'
                >
                  <Typography className={classes.heading}>casa</Typography>
                  <Typography className={classes.secondaryHeading}>
                    2 inteructores
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={classes.rootPaper}>
                    <Paper variant='outlined'>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={checked}
                              onChange={toggleChecked}
                            />
                          }
                          label='estado'
                        />
                      </FormGroup>
                      cosina
                    </Paper>
                    <Paper variant='outlined'>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={checked}
                              onChange={toggleChecked}
                            />
                          }
                          label='estado'
                        />
                      </FormGroup>
                      cortina
                    </Paper>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </Grid>
        </Grid>
      </container>
    </Grid>
  );
}
export default Bar;
