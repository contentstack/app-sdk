const clone = (source: { [key: string]: any }) =>
    JSON.parse(JSON.stringify(source));
export default { clone };
