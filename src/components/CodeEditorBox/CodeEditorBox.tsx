import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  useIonViewDidEnter,
  useIonViewWillEnter,
} from "@ionic/react";
import "./CodeEditorBox.css";
import React, { useRef, useState } from "react";
import { defaultCode, getDefaultCode } from "../../data/defaulText";

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
      <textarea
        disabled={!!isProcessing}
        id="editor"
        onChange={(e) => {
          setCode(e.target.value);
        }}
        value={code}
      ></textarea>
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
