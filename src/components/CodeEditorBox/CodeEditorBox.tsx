import { IonButton, IonItem, IonLabel, IonList, IonNote } from "@ionic/react";
import "./CodeEditorBox.css";
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";

interface codeEditorBoxProps {
  isProcessing: boolean;
  code: any;
  setCode: (text: string) => void;
}

const CodeEditorBox: React.FC<codeEditorBoxProps> = ({
  isProcessing,
  code,
  setCode,
}) => {
  return (
    <div id="input-wrapper" className="input-wrapper">
      <textarea
        disabled={!!isProcessing}
        id="editor"
        onChange={(e) => {
          setCode(e.target.value);
        }}
        value={code}
      ></textarea>
      <IonButton className="btn-reset-code" onClick={(e) => setCode("")}>
        Reset Code
      </IonButton>
    </div>
  );
};

export default CodeEditorBox;
