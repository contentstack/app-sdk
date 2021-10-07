export const mode: string;
export const entry: string;
export namespace output {
    const globalObject: string;
    const library: string;
    const libraryTarget: string;
    const path: string;
    const filename: string;
    const chunkFilename: string;
}
export namespace module {
    const rules: {
        test: RegExp;
        use: string;
        include: string[];
    }[];
}
export namespace resolve {
    const extensions: string[];
}
export const devtool: string;
//# sourceMappingURL=webpack.config.d.ts.map