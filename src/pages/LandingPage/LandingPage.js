import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
// import Header from "components/Header/Header.js";
// import Footer from "components/Footer/Footer.js";
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
// import Button from "components/CustomButtons/Button.js";
// import HeaderLinks from "components/Header/HeaderLinks.js";
// import Parallax from "components/Parallax/Parallax.js";

// import styles from "../../assets/jss/material-kit-react/views/landingPage.js";
import styles from "../../assets/jss/material-kit-react/views/loginPage.js";


// Sections for this page
// import ProductSection from "./Sections/ProductSection.js";
// import TeamSection from "./Sections/TeamSection.js";
// import WorkSection from "./Sections/WorkSection.js";
import image from "../../assets/img/bg7.jpg";
import Header from "../../shared/components/Header/Header";
import HeaderLinks from "../../shared/components/Header/HeaderLinks";
import GridContainer from "../../shared/components/Grid/GridContainer";
import GridItem from "../../shared/components/Grid/GridItem";
import Button from "../../shared/components/CustomButtons/Button";
import Footer from "../../shared/components/Footer/FooterV2";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
    const classes = useStyles();
    const { ...rest } = props;
    console.log("ajbwefjbefsjkdbfejksfb")
    return (
        <div>
            <Header
                color="transparent"
                routes={dashboardRoutes}
                brand="Material Kit React"
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 400,
                    color: "white"
                }}
                {...rest}
            />
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center"
                }}
            >
                <div className={classes.container}>
                    <GridContainer >
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 className={classes.title}>Your Story Starts With Us.</h1>
                            <h4>
                                Every landing page needs a small description after the big bold
                                title, that{"'"}s why we added this text here. Add here all the
                                information that can make you or your product create the first
                                impression.
                            </h4>
                            <br />
                            <Button
                                color="danger"
                                size="lg"
                                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fas fa-play" />
                                Watch video
                            </Button>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
            <Footer whiteFont />
        </div>
    );
}
