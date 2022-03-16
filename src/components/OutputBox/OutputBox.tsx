import { IonItem, IonLabel, IonList, IonNote } from "@ionic/react";
import "./OutputBox.css";
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";

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
      ></iframe>
    </div>
  );
};

export default OutputBox;
