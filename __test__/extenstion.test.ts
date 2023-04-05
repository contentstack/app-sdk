import postRobot from "post-robot";
import Extension from "../src/extension";

jest.mock("post-robot", () => ({
  __esModule: true,
  default: {
    on: jest.fn(),
    sendToParent: jest.fn(),
  },
}));

describe("Extension", () => {
  let extensionObj: Extension;
  const initializationData = { data: { type: "DASHBOARD" } };

  beforeEach(function () {
    extensionObj = new Extension(initializationData as any);
  });

  it("pulse should invoke post robot method with type analytics", () => {
    const eventName = "Sample Event";
    const metadata = { foo: "bar" };
    extensionObj.pulse(eventName, metadata);
    expect((postRobot as any).sendToParent).toHaveBeenCalledWith("analytics", {
      eventName,
      metadata,
    });
  });
});
