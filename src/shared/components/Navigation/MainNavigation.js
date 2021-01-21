import React, {useContext} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './MainNavigation.css';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from '@material-ui/core/Drawer';
import clsx from "clsx";
import List from '@material-ui/core/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import AuthNavLinks from "./AuthNavLinks";
import './NavLinks.css'
import green from "@material-ui/core/colors/green";
import {AuthContext} from "../../context/auth-context";
import CustomerNavLinks from "../../../pages/Navigation/CustomerNavLinks";
import Header from "../Header/Header";
import HeaderLinks from "../Header/HeaderLinks";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    // root: {
    //     display: 'flex',
    // },
    // appBar: {
    //     transition: theme.transitions.create(['margin', 'width'], {
    //         easing: theme.transitions.easing.sharp,
    //         duration: theme.transitions.duration.leavingScreen,
    //     }),
    //
    // },
    // appBarShift: {
    //     width: `calc(100% - ${drawerWidth}px)`,
    //     marginLeft: drawerWidth,
    //     transition: theme.transitions.create(['margin', 'width'], {
    //         easing: theme.transitions.easing.easeOut,
    //         duration: theme.transitions.duration.enteringScreen,
    //     }),
    // },
    // menuButton: {
    //     marginRight: theme.spacing(2),
    //     // display: "none"
    // },
    // hide: {
    //     display: 'none',
    // },
    // drawer: {
    //     width: drawerWidth,
    //     flexShrink: 0,
    // },
    // drawerPaper: {
    //     width: drawerWidth,
    //     // backgroundImage: 'url(' + "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg" + ')'
    // },
    // drawerHeader: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     padding: theme.spacing(0, 1),
    //     // necessary for content to be below app bar
    //     ...theme.mixins.toolbar,
    //     justifyContent: 'flex-end',
    // },
    // content: {
    //     flexGrow: 1,
    //     padding: theme.spacing(3),
    //     transition: theme.transitions.create('margin', {
    //         easing: theme.transitions.easing.sharp,
    //         duration: theme.transitions.duration.leavingScreen,
    //     }),
    //     marginLeft: -drawerWidth,
    // },
    // contentShift: {
    //     transition: theme.transitions.create('margin', {
    //         easing: theme.transitions.easing.easeOut,
    //         duration: theme.transitions.duration.enteringScreen,
    //     }),
    //     marginLeft: 0,
    // }, rightToolbar: {
    //     marginLeft: "auto",
    //     marginRight: -12
    // }
}));

const MainNavigation = props => {
    const auth = useContext(AuthContext);
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <div >
            <CssBaseline/>
            {/*<Header*/}
            {/*    absolute*/}
            {/*    color="transparent"*/}
            {/*    brand="Material Kit React"*/}
            {/*    rightLinks={<HeaderLinks />}*/}
            {/*/>*/}
                {/*{...rest}*/}
            {/*<AppBar*/}
            {/*    position="fixed"*/}
            {/*    className={clsx(classes.appBar, {*/}
            {/*        [classes.appBarShift]: open,*/}
            {/*    })}*/}
            {/*>*/}
            {/*    <Toolbar>*/}
            {/*        { auth.isLoggedIn &&*/}
            {/*        <div>*/}
            {/*        <IconButton*/}
            {/*            color="inherit"*/}
            {/*            aria-label="open drawer"*/}
            {/*            onClick={handleDrawerOpen}*/}
            {/*            edge="start"*/}

            {/*            className={clsx(classes.menuButton, open && classes.hide)}*/}
            {/*        >*/}
            {/*            <MenuIcon/>*/}
            {/*        </IconButton>*/}
            {/*        </div>}*/}
            {/*        <Typography variant="h6" noWrap>*/}
            {/*            Welcome, please { auth.isLoggedIn ? 'enjoy!' : 'login!'}*/}
            {/*        </Typography>*/}
            {/*        <section className={classes.rightToolbar}>*/}
            {/*            <AuthNavLinks/>*/}
            {/*        </section>*/}
            {/*    </Toolbar>*/}
            {/*</AppBar>*/}
            {/*<Drawer*/}
            {/*    className={classes.drawer}*/}
            {/*    variant="persistent"*/}
            {/*    anchor="left"*/}
            {/*    open={open}*/}
            {/*    classes={{*/}
            {/*        paper: classes.drawerPaper,*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <div className={classes.drawerHeader}>*/}
            {/*        <IconButton onClick={handleDrawerClose}>*/}
            {/*            {theme.direction === 'ltr' ? <ChevronLeftIcon  style={{ color: green[500] }}/> : <ChevronRightIcon  style={{ color: green[500] }}/>}*/}
            {/*        </IconButton>*/}
            {/*    </div>*/}
            {/*    <Divider/>*/}
            {/*    <List>*/}
            {/*        <CustomerNavLinks/>*/}
            {/*    </List>*/}
            {/*</Drawer>*/}
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader}/>

            </main>
        </div>
    );
};

export default MainNavigation;
