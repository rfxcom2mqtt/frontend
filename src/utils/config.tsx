type Config = {
    basePath: string;
    publicPath: string;
};

const getConfig = (): Config => {
    return (window as any).config ? (window as any).config : {};
};

export default getConfig();
