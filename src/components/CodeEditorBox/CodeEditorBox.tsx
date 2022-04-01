import { IonButton, useIonViewWillEnter } from "@ionic/react";
import "./CodeEditorBox.css";
import React, { useState } from "react";
import { defaultCode, getDefaultCode } from "../../data/defaulText";

import { CodeMirror } from "react-codemirror6";
import { EditorView } from "@codemirror/view";

let myTheme = EditorView.theme(
  {
    "&": {
      color: "white",
      backgroundColor: "#034",
      width: "100%",
      height: "300px",
      overflow: "hidden",
    },
    ".cm-content": {
      caretColor: "#0e9",
      whiteSpace: "pre-line",
    },
    "&.cm-focused .cm-cursor": {
      borderLeftColor: "#0e9",
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "#074",
    },
    ".cm-gutters": {
      backgroundColor: "#045",
      color: "#ddd",
      border: "none",
    },
    ".cm-scroller": {},
  },
  { dark: true }
);

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
  const [DefaultEdit, setDefaultEdit] = useState<defaultCode>();

  useIonViewWillEnter(async () => {
    await getDefaultEdit().then(() => {
      setCode(getDefaultCode().text);
    });
  });

  async function getDefaultEdit(): Promise<void> {
    setDefaultEdit(getDefaultCode());
  }

  return (
    <div id="input-wrapper" className="input-wrapper">
      <CodeMirror
        id="editor"
        value={code}
        onChange={(e) => {
          setCode(e);
        }}
        extensions={[myTheme]}
      />
      {/* <textarea
        disabled={!!isProcessing}
        id="editor"
        onChange={(e) => {
          setCode(e.target.value);
        }}
        value={code}
      ></textarea> */}
      <IonButton
        className="btn-reset-code"
        onClick={(e) => setCode(DefaultEdit?.text!)}
      >
        Reset Code
      </IonButton>
    </div>
  );
};

export default CodeEditorBox;
