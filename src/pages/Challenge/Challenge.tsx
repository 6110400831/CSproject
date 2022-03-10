import React, { useRef, useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonRow,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { personCircle } from "ionicons/icons";
import { useParams } from "react-router";
import "./Challenge.css";
import { challenge } from "../../data/challenge";
import { chapter, getChallenge, getChapter } from "../../data/chapter";
import OutputBox from "../../components/OutputBox/OutputBox";
import CodeEditorBox from "../../components/CodeEditorBox/CodeEditorBox";

function ChallengePage() {
  const [Chapter, setChapter] = useState<chapter>();
  const [Challenge, setChallenge] = useState<challenge>();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [code, setCode] = useState<string>();

  const outputWrapperRef = React.useRef<HTMLDivElement>(null);
  const outputRef = React.useRef<HTMLIFrameElement>(null);
  const targetRef = React.useRef<HTMLImageElement>(null);

  const params = useParams<{ chapterId: string; challengeId: string }>();

  useIonViewWillEnter(() => {
    setChapter(getChapter(parseInt(params.chapterId)));
    setChallenge(
      getChallenge(parseInt(params.chapterId), parseInt(params.challengeId))
    );

    setCode("");
  });

  function setCodeValue(text: string) {
    setCode(text);
  }

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar className="d-in-flex">
          <>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home"></IonBackButton>
            </IonButtons>
            <IonLabel>
              Chapter {Chapter?.chapterName} challenge {Challenge?.name}
            </IonLabel>
          </>

          <IonIcon
            className="mr-auto"
            icon={personCircle}
            slot="end"
            color="primary"
          >
            <IonLabel className="ion-text-wrap mr-auto">name</IonLabel>
          </IonIcon>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid className="gridBox">
          <IonRow>
            <IonCol size="4" className="d-flex">
              <IonLabel>Editor</IonLabel>
            </IonCol>
            <IonCol size="4" className="d-flex jus-center">
              <IonLabel>Output</IonLabel>
            </IonCol>
            <IonCol size="4" className="d-flex jus-center">
              <IonLabel>Target</IonLabel>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="4" className="codEditor">
              {/* <textarea
                disabled={!!isProcessing}
                id="editor"
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                value={code}
              ></textarea>
              <IonButton className="btn-reset-code" onClick={resetCode}>
                Reset Code
              </IonButton> */}
              <CodeEditorBox
                isProcessing={isProcessing}
                code={code}
                setCode={setCodeValue}
              />
            </IonCol>

            <IonCol size="4" className="output-container">
              {/* <div
                id="output-wrapper"
                className="output-wrapper"
                ref={outputWrapperRef!}
              >
                <iframe
                  id="source"
                  ref={outputRef!}
                  className="iframe-output"
                  width="300px"
                  height="300px"
                  title="output"
                  srcDoc={code}
                ></iframe>
              </div> */}
              <OutputBox
                code={code!}
                outputWrapperRef={outputWrapperRef}
                outputRef={outputRef}
              />
            </IonCol>

            <IonCol size="4">
              <div className="target-container d-flex jus-center">
                <img
                  id="target"
                  ref={targetRef}
                  src={require("../../images/Group 23.png")}
                  width="300px"
                  height="300px"
                  alt=""
                />
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default ChallengePage;
