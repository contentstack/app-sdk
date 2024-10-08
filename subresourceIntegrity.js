const ssri = require("ssri");
const fs = require("fs");
const jsonfile = require("jsonfile");

async function generateSRI() {
    const blueprintPath = "./blueprint.json";

    const sriJS = await ssri.fromStream(
        fs.createReadStream("./dist/index.js")
    );

    let blueprint = {};
    if (fs.existsSync(blueprintPath) && fs.statSync(blueprintPath).size > 0) {
        blueprint = JSON.parse(fs.readFileSync(blueprintPath));
    }

    blueprint.subresourceIntegrity = {
        js: sriJS.toString()
    };

    jsonfile.writeFile(blueprintPath, blueprint, { spaces: 2 });
}

generateSRI();