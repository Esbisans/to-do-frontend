import {useLottie, useLottieInteractivity} from "lottie-react";
import editJson from "./edit.json";

const style = {

  height: 25,

};

const editIcon = () => {

    const options = {
        animationData: editJson,
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
    
export default editIcon;