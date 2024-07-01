import { onData, onError } from "./utils";
import PostRobot from "post-robot";

export function dispatchPostRobotRequest(postRobot: typeof PostRobot, opts:MakeRequestOptions):Promise<any> {
    return postRobot
      .sendToParent("apiAdapter", opts)
      .then(onData)
      .then((data) => data)
      .catch(onError);
}