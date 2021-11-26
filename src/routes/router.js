import Color from "../view/design/Color";
import CodeFormatter from "../view/develop/CodeFormatter";
import DesCrypt from "../view/develop/DesCrypt";
import HashCrypt from "../view/develop/HashCrypt";
import ImageEncode from "../view/develop/ImageEncode";
import QrEncode from "../view/develop/QrEncode";
import RsaCrypt from "../view/develop/RsaCrypt";
import TextEncode from "../view/develop/TextEncode";
import PdfMerge from "../view/document/PdfMerge";
import PdfSplit from "../view/document/PdfSplit";

const routes = [
    { path: "/", main: <h1>欢迎使用码匠工具集</h1> },
    { path: "/crypt/hash", main: <HashCrypt /> },
    { path: "/crypt/des", main: <DesCrypt /> },
    { path: "/crypt/rsa", main: <RsaCrypt /> },
    { path: "/encode/text", main: <TextEncode /> },
    { path: "/encode/image", main: <ImageEncode /> },
    { path: "/encode/qr", main: <QrEncode /> },
    { path: "/pdf/merge", main: <PdfMerge /> },
    { path: "/pdf/split", main: <PdfSplit /> },
    { path: "/front/format", main: <CodeFormatter /> },
    { path: "/color", main: <Color /> },
    { path: "/*", main: <h1>Todo</h1> },
]

export default routes;