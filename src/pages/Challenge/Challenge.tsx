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
  IonLabel,
  IonModal,
  IonPage,
  IonRow,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { personCircle, closeOutline } from "ionicons/icons";
import { useParams } from "react-router";
import "./Challenge.css";
import OutputBox from "../../components/OutputBox/OutputBox";
import CodeEditorBox from "../../components/CodeEditorBox/CodeEditorBox";
import html2canvas from "html2canvas";
import { getViewerStatus, viewerStatus } from "../../data/viewerStatus";
import { compareImage, getChallenge } from "../../data/challengeAPI";
import { getChapter } from "../../data/chapterAPI";
import { getCurrentUser, getCurrentUserProgress } from "../../data/userAPI";
import { logout } from "../../data/authAPI";

function ChallengePage() {
  const [chapter, setChapter] = useState<any>();
  const [challenge, setChallenge] = useState<any>();
  const [User, setUser] = useState<any>(null);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  const outputWrapperRef = React.useRef<HTMLDivElement>(null);
  const outputRef = React.useRef<HTMLIFrameElement>(null);
  const targetRef = React.useRef<HTMLIonImgElement>(null);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [contentText, setText] = useState<string>("Confirm Submit");
  const [confirmButton, setConfirmButtonText] = useState<string>("YES");
  const [noButton, setNoButtonText] = useState<string>("NO");

  const params = useParams<{ chapterId: string; challengeId: string }>();

  useIonViewWillEnter(async () => {
    await setPage();
  });

  const setPage = async () => {
    const chapter = (
      await Promise.resolve(getChapter(parseInt(params.chapterId)))
    ).data;
    const challenge = (
      await Promise.resolve(getChallenge(parseInt(params.challengeId)))
    ).data.data;
    //console.log(chapter);
    //console.log(challenge);
    setChapter(chapter);
    setChallenge(challenge);

    await getCurrentUser().then((user) => {
      if (user) {
        setUser(user.data);
        //console.log(user);
      } else {
        console.log("plz login");
      }
    });

    if (sessionStorage.getItem("finished_challenge") === null) {
      await getCurrentUserProgress().then((data) => {
        //console.log(data.data);
        sessionStorage.setItem("finished_challenge", data.data);
      });
    }
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
    const outputImage = canvas.toDataURL("image/png", 1.0);

    // const targetImage = await (
    //   await html2canvas(targetRef.current!, {
    //     windowWidth: 300,
    //     windowHeight: 300,
    //     scale: 1,
    //     logging: false,
    //     useCORS: true,
    //   })
    // ).toDataURL("image/png", 1.0);

    let checkAns: boolean = false;
    // console.log(compareImage(outputImage, parseInt(params.challengeId)));
    // let finished: any[] = [];
    // if (sessionStorage.getItem("finished_challenge")) {
    //   finished = sessionStorage.getItem("finished_challenge")?.split(",")!;
    // }
    await compareImage(outputImage, [], parseInt(params.challengeId)).then(
      (val) => {
        checkAns = val.data.status;
        sessionStorage.setItem("finished_challenge", val.data.data.finished);
      }
    );
    //console.log(sessionStorage.getItem("finished_challenge"));

    // downloadImage(outputImage, challenge.name);

    // console.log(outputImage);
    // console.log(targetImage);

    if (checkAns) {
      return true;
    } else {
      return false;
    }
  }

  const downloadImage = async (blob: any, fileName: string) => {
    const fakeLink = await window.document.createElement("a");
    fakeLink.setAttribute("style", "display:none;");
    fakeLink.download = window.location.origin + fileName;
    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };

  function setCloseModal() {
    setShowModal(false);

    setText("Confirm Submit");
    setConfirmButtonText("YES");
    setNoButtonText("NO");
  }

  function setSubmitConfirm(check: boolean) {
    if (contentText === "Confirm Submit") {
      if (check) {
        setText("PASS");
        setConfirmButtonText("Go to home");
        //setNoButtonText("NO");
      } else {
        setText("try again plz");
        setConfirmButtonText("Try again");
        //setNoButtonText("NO");
      }
    } else if (contentText === "try again plz") {
      setShowModal(false);
    } else if (contentText === "PASS") {
      window.location.href = "/home";
    }
  }

  function setCancelButton() {
    if (contentText === "Confirm Submit") {
      setShowModal(false);
    } else {
      if (contentText === "PASS") {
        setShowModal(false);
      } else {
        window.location.href = "/home";
      }
    }
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
              {chapter?.name} - {challenge?.name}
            </IonLabel>
          </>

          <IonIcon
            className="mr-auto"
            icon={personCircle}
            slot="end"
            color="primary"
          ></IonIcon>
          <IonLabel className="ion-text-wrap mr-auto" slot="end">
            {User == null ? "guest" : User?.name}
          </IonLabel>
          <IonButton
            slot="end"
            style={{ display: User ? "block" : "none" }}
            onClick={(e) =>
              logout().then(() => {
                window.location.replace("/");
              })
            }
          >
            Logout
          </IonButton>
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
              <IonImg
                className="thisCAT"
                src={window.location.origin + "/assets/icon/hint_cat.png"}
                aria-label={challenge?.hint}
                data-balloon-pos="up"
              ></IonImg>
            </IonCol>

            <IonCol size="4">
              <div id="target-image" className="target-container">
                <IonImg
                  id="target"
                  ref={targetRef}
                  src={challenge?.image}
                  // src={
                  //   window.location.origin +
                  //   "/assets/images/test" +
                  //   challenge?.id +
                  //   ".png"
                  // }
                  alt=""
                />
                <div>300 x 300 px</div>
                <div className="descriptionText">{challenge?.description}</div>
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

      <IonModal
        className="thisModal"
        isOpen={showModal}
        swipeToClose={true}
        onDidDismiss={() => setCloseModal()}
      >
        <div className="modalContent">
          <IonLabel>{contentText}</IonLabel>
          <IonButton
            className="close-button"
            onClick={() => setShowModal(false)}
          >
            <IonIcon slot="icon-only" icon={closeOutline}></IonIcon>
          </IonButton>
          <div className="button-bar">
            <IonButton className="no-button" onClick={() => setCancelButton()}>
              {noButton}
            </IonButton>
            <IonButton
              className="yes-button"
              onClick={() =>
                exportAsImage(
                  outputRef.current,
                  "answer_" + challenge?.name!
                ).then((val) => setSubmitConfirm(val))
              }
            >
              {confirmButton}
            </IonButton>
          </div>
        </div>
      </IonModal>
    </IonPage>
  );
}

export default ChallengePage;
