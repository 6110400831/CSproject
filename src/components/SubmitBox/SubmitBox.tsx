import { IonButton, IonIcon, IonLabel } from "@ionic/react";
import "./SubmitBox.css";
import React, { useRef, useState } from "react";
import { closeOutline } from "ionicons/icons";
import ReactDom from "react-dom";

interface SubmitBoxProps {
  check: Promise<boolean>;
  setShowModal: (checked: boolean) => void;
}

const closeModal = (e: any, modalRef: any, setShowModal: any) => {
  if (e.target === modalRef.current) {
    setShowModal(false);
  }
};

const SubmitBox: React.FC<SubmitBoxProps> = ({ check, setShowModal }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [contentText, setText] = useState<string>("Confirm Submit");
  const [confirmButton, setConfirmButtonText] = useState<string>("YES");
  const [noButton, setNoButtonText] = useState<string>("NO");

  async function submitConfirm() {
    const checked = check;

    if (contentText === "Confirm Submit") {
      if ((await checked) === true) {
        setText("PASS");
        setConfirmButtonText("Continue?");
        setNoButtonText("Go to Gallery");
      } else {
        setText("try again plz");
        setConfirmButtonText("Try again");
        setNoButtonText("NO");
      }
    } else {
      setShowModal(false);
    }
  }

  function setNoButtonClick() {
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

  return ReactDom.createPortal(
    <div
      className="container"
      ref={modalRef}
      onClick={(e) => {
        closeModal(e, modalRef, setShowModal);
      }}
    >
      <div className="content">
        <IonLabel>{contentText}</IonLabel>
        <IonButton className="close-button" onClick={() => setShowModal(false)}>
          <IonIcon slot="icon-only" icon={closeOutline}></IonIcon>
        </IonButton>
        <div className="button-bar">
          <IonButton className="no-button" onClick={() => setNoButtonClick()}>
            {noButton}
          </IonButton>
          <IonButton className="yes-button" onClick={() => submitConfirm()}>
            {confirmButton}
          </IonButton>
        </div>
      </div>
    </div>,
    document.getElementById("modal")!
  );
};

export default SubmitBox;
