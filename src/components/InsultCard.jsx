import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { filterOffensiveWords } from "../utilities/filterOffensiveWords";
export default function InsultCard({ insult }) {
  return (
    //card component which is the one that changes color by the
    // bounce animation effect
    //uses utility function to check if there is a profanity word to ban it
    <Card
      id="card-component"
      direction="row"
      sx={{ width: "1", height: "70%" }}
      height="1"
      variant="outlined"
      style={{ background: "rgb(255, 84, 65) 100%" }}
    >
      <CardHeader
        title="Feeling like wanting an insult?"
        subheader="Came to the right place"
      ></CardHeader>
      <CardContent>
        <Typography variant="h4" alignSelf={"center"} alignItems="center">
          {insult?.insult !== undefined
            ? filterOffensiveWords(insult.insult)
            : ""}
        </Typography>
      </CardContent>
    </Card>
  );
}
