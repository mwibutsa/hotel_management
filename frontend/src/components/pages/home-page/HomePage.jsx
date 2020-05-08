import React from "react";
import classes from "./HomePage.module.css";
import commonClasses from "../../common.module.css";
import RoomCategoryCard from "../../shared-components/room-category-card/RoomCategoryCard";
import GymImage from "../../../images/gym.png";
import PoolImage from "../../../images/swimmingpool.png";
import { LinkButton } from "../../shared-components/Button/Button";
import SingleImage from "../../../images/bed-bedroom-furniture-headboard-279746 (1).jpg";
import GoldRoomImage from "../../../images/black-and-grey-bedspread-on-bed-and-pillow-164595 (1).jpg";
import TwinImage from "../../../images/white-bed-sheet-set-2736388.jpg";
import PageContainer from '../../shared-components/PageContainer/PageContainer'

const HomePage = (props) => (
  <PageContainer>
    <div className={classes.HomePage}>
    <div className={classes.WelcomeSection}></div>
    <div className={classes.ContentContainer}>
      <h3
        className={[
          commonClasses.TextCenter,
          commonClasses.TextYellow,
          classes.WelcomeHeading,
        ].join(" ")}
      >
        Welcome to the SweetLife Hotel
      </h3>

      <div className={classes.IntroContainer}>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum
        </p>
        <p className={commonClasses.ButtonContainer}>
          <LinkButton label="Book Now" path="/booking" />
        </p>
      </div>
    </div>

    <div className={classes.RoomSection}>
      <div className="container">
        <h3
          className={[commonClasses.TextCenter, classes.RoomHeading].join(" ")}
        >
          ROOM CATEGORIES
        </h3>
        <br />
        <div className="row">
          <div className="col-sm-12 col-md-4">
            <RoomCategoryCard
              type="single"
              image={SingleImage}
              description="A perfect room for one person"
              price="$350"
            />
          </div>
          <div className="col-sm-12 col-md-4">
            <RoomCategoryCard
              type="Twin"
              image={TwinImage}
              description="A Switable room with two bed"
              price="$420"
            />
          </div>

          <div className="col-sm-12 col-md-4">
            <RoomCategoryCard
              type="Gold"
              image={GoldRoomImage}
              description="A perfect room for a King/Queen"
              price="$500"
            />
          </div>
        </div>
      </div>
    </div>

    <div className={classes.AccessibilitySection}>
      <div className={"container " + classes.AccessibilityContainer}>
        <h3
          className={[commonClasses.TextCenter, classes.RoomHeading].join(" ")}
        >
          ACCESSIBILITY
        </h3>
        <br />
        <br />

        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div className={classes.SwimmingPoolSection}>
              <h4
                className={[
                  commonClasses.TextCenter,
                  commonClasses.TextWhite,
                ].join(" ")}
              >
                24/7 Access to the Swimming pool
              </h4>
              <img src={PoolImage} alt="Swimming pool" />
            </div>
          </div>
          <div className="col col-sm-12 col-md-6">
            <div className={classes.GymSection}>
              <h4
                className={[
                  commonClasses.TextCenter,
                  commonClasses.TextWhite,
                ].join(" ")}
              >
                24/7 access to the Gym
              </h4>
              <img src={GymImage} alt="Gym" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </PageContainer>
);

export default HomePage;
