export interface defaultCode{
    text: string;
}

const dCode: defaultCode  = {
    text: "<div></div>" +
    "\n" +
    "<style>" +
    "\n" +
    "body {" +
    "\n" +
    "margin: 0;" +
    "\n" +
    "}" +
    "\n" +
    "div {" +
    "\n" +
    "  width: 100px;" +
    "\n" +
    "  height: 100px;" +
    "\n" +
    "  background: #dd6b4d;" +
    "\n" +
    "}" +
    "\n\n" +
    "/*Note: The comparison engine on Submit is not 100% accurate and might lead to lower score. */" +
    "\n\n" +
    "</style>"
}     

export const getDefaultCode = () => dCode;