import ImageEncode from "../view/develop/ImageEncode";
import TextEncode from "../view/develop/TextEncode";

const routes = [
    { path: "/", main: <h1>欢迎使用码匠工具集</h1> },
    { path: "/encode/text", main: <TextEncode /> },
    { path: "/encode/image", main: <ImageEncode /> },
    { path: "/*", main: <h1>Todo</h1> },
]

export default routes;