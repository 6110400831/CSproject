import React, { useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
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
import html2canvas from "html2canvas";
import SubmitBox from "../../components/SubmitBox/SubmitBox";
import { Route } from "workbox-routing";

function ChallengePage() {
  const [Chapter, setChapter] = useState<chapter>();
  const [Challenge, setChallenge] = useState<challenge>();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  const outputWrapperRef = React.useRef<HTMLDivElement>(null);
  const outputRef = React.useRef<HTMLIFrameElement>(null);
  const targetRef = React.useRef<HTMLIonImgElement>(null);

  const [showModal, setShowModal] = useState<boolean>(false);

  const params = useParams<{ chapterId: string; challengeId: string }>();

  useIonViewWillEnter(() => {
    console.log(Route.length);
    setPage();
  });

  const setPage = async () => {
    const chapter = await getChapter(parseInt(params.chapterId));
    const challenge = await getChallenge(
      parseInt(params.chapterId),
      parseInt(params.challengeId)
    );
    setChapter(chapter);
    setChallenge(challenge);
  };

  function setCodeValue(text: string) {
    setCode(text);
  }

  async function exportAsImage(el: any, imageFileName: string) {
    const canvas = await html2canvas(el, {
      windowWidth: 300,
      windowHeight: 300,
      scale: 1,
      logging: false,
    });
    // document.getElementById("target-image")!.appendChild(canvas);
    const outputImage = canvas.toDataURL("image/png", 1.0);
    const targetImage = await (
      await html2canvas(targetRef.current!, {
        windowWidth: 300,
        windowHeight: 300,
        scale: 1,
        logging: false,
      })
    ).toDataURL("image/png", 1.0);

    // await downloadImage(outputImage, imageFileName);

    if (outputImage === targetImage) {
      return true;
    } else {
      return false;
    }
  }

  // const downloadImage = async (blob: any, fileName: string) => {
  //   const fakeLink = await window.document.createElement("a");
  //   fakeLink.setAttribute("style", "display:none;");
  //   fakeLink.download = fileName;
  //   fakeLink.href = blob;

  //   document.body.appendChild(fakeLink);
  //   fakeLink.click();
  //   document.body.removeChild(fakeLink);

  //   fakeLink.remove();
  // };

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

      <IonContent fullscreen className="px-32">
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
                code={code}
                outputWrapperRef={outputWrapperRef}
                outputRef={outputRef}
              />
            </IonCol>

            <IonCol size="4">
              <div
                id="target-image"
                className="target-container d-flex jus-center"
              >
                <IonImg
                  id="target"
                  ref={targetRef}
                  src={window.location.origin + Challenge?.image}
                  alt=""
                />
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonButton
          className="submit-button"
          onClick={(e) => {
            setShowModal(true);
          }}
        >
          Submit
        </IonButton>
      </IonContent>

      {showModal ? (
        <SubmitBox
          check={exportAsImage(outputRef.current, Challenge?.name!)}
          setShowModal={setShowModal}
        />
      ) : null}
    </IonPage>
  );
}

export default ChallengePage;
