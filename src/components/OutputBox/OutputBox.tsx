import "./OutputBox.css";
import React from "react";

interface OutputBoxProps {
  code: string;
  outputWrapperRef: any;
  outputRef: any;
}

const OutputBox: React.FC<OutputBoxProps> = ({
  code,
  outputWrapperRef,
  outputRef,
}) => {
  return (
    <div id="output-wrapper" className="output-wrapper" ref={outputWrapperRef!}>
      <iframe
        id="source"
        ref={outputRef!}
        className="iframe-output"
        width="300px"
        height="300px"
        title="output"
        srcDoc={code}
        scrolling="no"
        sandbox="allow-same-origin"
      ></iframe>
    </div>
  );
};

export default OutputBox;
