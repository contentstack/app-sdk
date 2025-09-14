// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, "src", "index.ts"),
    output: {
        globalObject: "this",
        library: "ContentstackAppSDK",
        libraryTarget: "umd",
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        chunkFilename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                include: [path.resolve(__dirname, "src")],
            },
            {
                test: /.css$/,
                use: "css-loader",
                include: [path.resolve(__dirname, "src")],
            },
        ],
    },
    resolve: {
        extensions: [".json", ".js", ".ts", ".css", ".tsx"],
    },
    devtool: "source-map",
    optimization: {
        // Enable tree shaking
        usedExports: true,
        // Minimize the bundle
        minimize: true,
    },
    performance: {
        // Increase the size limit warnings to be more reasonable for a library
        maxAssetSize: 500000, // 500 KiB
        maxEntrypointSize: 500000, // 500 KiB
        hints: "warning",
    },
};
