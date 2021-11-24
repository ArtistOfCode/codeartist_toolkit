import ImageEncode from "../view/develop/ImageEncode";
import QrEncode from "../view/develop/QrEncode";
import TextEncode from "../view/develop/TextEncode";
import PdfMerge from "../view/document/PdfMerge";

const routes = [
    { path: "/", main: <h1>欢迎使用码匠工具集</h1> },
    { path: "/encode/text", main: <TextEncode /> },
    { path: "/encode/image", main: <ImageEncode /> },
    { path: "/encode/qr", main: <QrEncode /> },
    { path: "/pdf/merge", main: <PdfMerge /> },
    { path: "/*", main: <h1>Todo</h1> },
]

export default routes;