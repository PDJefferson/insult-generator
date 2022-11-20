import { Button, Grid, Box, ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import InsultCard from "./InsultCard";
import { animate } from "popmotion";
import { fetchInsult } from "../services/insult";

const BACKGROUND_COLOR_ANIMATION_INITIAL = "rgb(255, 84, 65) 100%";
const BACKGROUND_COLOR_ANIMATION_SECONDARY = "rgb(96, 255, 65) 0%";
export default function Frame() {
  const domElement = document.getElementById("card-component");
  const [insult, setInsult] = useState([]);
  const [index, setIndex] = useState(0);
  const [runAnimation, setRunAnimation] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addInsult, setAddInsult] = useState(true);

  useEffect(() => {
    if (runAnimation) {
      setRunAnimation(!runAnimation);
      //it changes the color with the bounce effect
      //the current speed of the bounce animation is 900 or almost a sec with an offset of 2
      //which is the mass prop to make the animation a bit slower 
      //with damping the slower the val the longer the bouncing animation takes
      animate({
        from: BACKGROUND_COLOR_ANIMATION_SECONDARY,
        to: BACKGROUND_COLOR_ANIMATION_INITIAL,
        damping: 1.5,
        bounce: 5,
        type: "spring",
        velocity: 900,
        mass: 2,
        bounceStiffness: 1000,
        onUpdate: (current) => {
          domElement.style.background = current;
        },
      });
    }
    //if an insult is needed to add, append it to the list
    if (addInsult) {
      setAddInsult(!addInsult);

      //get the insults from the api an udpate values
      fetchInsult(index).then((result) => {
        setInsult(insult.concat(result));
        setCurrentIndex(index);
        setIndex(index + 1);
      });
    }
  }, [addInsult, insult, index, domElement, runAnimation]);

  //add more insults only if we are the last element from the lost, otherwise keep
  //reading the elements stored in the list
  const fetchMoreInsults = () => {
    setRunAnimation(!runAnimation);
    if (currentIndex + 1 !== index) {
      setCurrentIndex(currentIndex + 1);
      return;
    }

    setAddInsult(!addInsult);
  };

  //find the previous insult and read it
  const previousInsult = () => {
    setRunAnimation(!runAnimation);

    setCurrentIndex(currentIndex - 1);
  };

  return (
    //main container that follows that uses flexbox to mimic the grid layout
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid
        container
        item
        sx={{ border: 1, borderRadius: 1 }}
        padding="0"
        direction="row"
        width={"80%"}
        justifyContent="center"
        textAlign="center"
        height="60vh"
      >
        <InsultCard insult={insult[currentIndex]} />
        <Grid
          item
          container
          direction="row"
          width={"80%"}
          spacing={12}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item md={4} container direction="column">
            <Button
              variant="outlined"
              color="info"
              onClick={previousInsult}
              disabled={currentIndex === 0}
            >
              previous
            </Button>
          </Grid>
          <Grid item md={4} container direction="column">
            <Button
              variant="outlined"
              color="primary"
              onClick={fetchMoreInsults}
            >
              next
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
