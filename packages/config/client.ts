
// @ts-ignore
const env = import.meta.env // import.meta来自vite，process.env无法取到值
export default {
    server: env.PUBLIC_SERVER || (env.MODE === 'development' ? "//localhost:9200" : "/")
}
