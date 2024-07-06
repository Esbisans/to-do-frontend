import {useLottie, useLottieInteractivity} from "lottie-react";
import trashJson from "./trash.json";

const style = {

  height: 25,
  // border: 3,
  // borderStyle: "solid",
  // borderRadius: 7,

};

const trashIcon = () => {
  

  const options = {
    animationData: trashJson,
  };

  const lottieObj = useLottie(options, style);
  const Animation = useLottieInteractivity({
    lottieObj,
    mode: "cursor",
    actions: [
      {
        position: { x: [0, 1], y: [0, 1] },
        type: "loop",
        frames: [0, 24],
      },
      {
        position: { x: -1, y: -1 },
        type: "stop",
        frames: [0],
      },
    ],
  });

  return Animation;
};

export default trashIcon;