/* eslint-disable @typescript-eslint/no-var-requires */
const NodeEnvironment = require("jest-environment-node");

/**
 * Jest 27 does not expose the WHATWG fetch globals inside the test sandbox.
 * The adapter builds `Response`/`Headers` objects, so copy Node's own
 * implementations (Node >= 18) into the sandbox.
 */
class FetchEnvironment extends NodeEnvironment {
    constructor(config, context) {
        super(config, context);
        ["Response", "Headers", "Request", "Blob", "FormData"].forEach(
            (name) => {
                if (!this.global[name] && global[name]) {
                    this.global[name] = global[name];
                }
            }
        );
    }
}

module.exports = FetchEnvironment;
