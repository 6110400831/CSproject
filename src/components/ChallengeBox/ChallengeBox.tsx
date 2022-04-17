import {
  IonButton,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonSlide,
  IonTextarea,
} from "@ionic/react";
import html2canvas from "html2canvas";
import { LegacyRef, useState } from "react";
import { challenge } from "../../data/challenge";
import { createChallenge, updateChallenge } from "../../data/challengeAPI";
import "./ChallengeBox.css";

interface ChallengeBoxProps {
  Challenge: any;
  chapterId: number;
  adminEntered?: boolean;
}

const ChallengeBox: React.FC<ChallengeBoxProps> = ({
  Challenge,
  chapterId,
  adminEntered,
}) => {
  const setClickChallengeBox = async () => {};
  const [showModal, setShowModal] = useState<boolean>(false);
  const [image, setImage] = useState<any>();

  const [formRef, setFormRef] = useState<LegacyRef<HTMLFormElement>>();
  const [challengeName, setChallengeName] = useState<string>("");
  const [challengeDescription, setChallengeDescription] = useState<string>("");
  const [challengeHint, setChallengeHint] = useState<string>("");

  const uploadPhoto = async (fileChangeEvent: any) => {
    if (fileChangeEvent.target.files[0]) {
      const photo = await URL.createObjectURL(fileChangeEvent.target.files[0]);
      var img = new Image();
      img.src = photo;
      img.crossOrigin = "Anonymous";
      setImage(photo);
    }
  };

  function setChallengeFormValue() {
    setChallengeName(Challenge.name);
    setChallengeDescription(Challenge.description);
    setChallengeHint(Challenge.hint);
    setImage("http://localhost:8000/" + Challenge.image);

    setShowModal(true);
  }

  return (
    <>
      <IonItem
        className="box"
        // href={`/challenge/${chapterId}/${Challenge.id}`}
        onClick={(e) => {
          setClickChallengeBox();
        }}
        routerLink={`/challenge/${chapterId}/${Challenge.id}`}
        style={{ pointerEvents: adminEntered ? "none" : "auto" }}
      >
        <div className="d-flex f-column align-center">
          <IonImg
            className="target-image"
            // src={window.location.origin + Challenge?.image}
            src={"http://localhost:8000/" + Challenge.image}
          ></IonImg>
          {adminEntered ? "" : Challenge.name}
        </div>
      </IonItem>
      <IonButton
        onClick={setChallengeFormValue}
        style={{ display: adminEntered ? "block" : "none" }}
      >
        Edit {Challenge.name}
      </IonButton>

      <IonModal
        className="editChallengeModal"
        isOpen={showModal}
        swipeToClose={true}
        onDidDismiss={() => setShowModal(false)}
      >
        <form
          ref={formRef}
          onSubmit={async (e: React.SyntheticEvent) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              challengeName: { value: string };
              challengeDescription: { value: string };
              challengeHint: { value: string };
              imageFile: { value: string };
            };
            const name = target.challengeName.value;
            const description = target.challengeDescription.value;
            const hint = target.challengeHint.value;

            let challengeImage = null;
            if (target.imageFile.value != "") {
              const canvas = await html2canvas(
                document.getElementById("canvas")!,
                {
                  windowWidth: 300,
                  windowHeight: 300,
                  scale: 1,
                  logging: false,
                  useCORS: true,
                }
              );
              challengeImage = canvas.toDataURL("image/png", 1.0);
            }
            //console.log(challengeImage);

            await updateChallenge(
              Challenge.id,
              name,
              description,
              hint,
              challengeImage
            ).then(() => {
              window.location.reload();
            });
          }}
        >
          <IonItem>
            <IonLabel position="stacked">Challenge Name</IonLabel>
            <IonInput
              name="challengeName"
              id="edit-name"
              type="text"
              value={challengeName}
              required
              placeholder="Enter new challenge name"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Challenge Info</IonLabel>
            <IonTextarea
              name="challengeDescription"
              id="edit-description"
              value={challengeDescription}
              placeholder="Enter challenge info"
              required
            ></IonTextarea>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Hint</IonLabel>
            <IonTextarea
              name="challengeHint"
              id="edit-Hint"
              value={challengeHint}
              placeholder="Enter challenge hint"
              required
            ></IonTextarea>
          </IonItem>
          <IonLabel style={{ display: "block" }}>Image</IonLabel>
          <input
            name="imageFile"
            type="file"
            onChange={async (ev) => await uploadPhoto(ev)}
            accept="image/png, image/jpeg"
          ></input>
          <img
            src={image}
            width="300"
            height="300"
            id="canvas"
            alt="preview img"
            style={{ display: image ? "block" : "none" }}
          />
          {/* <img src={challengeImage} width="300" height="300" /> */}
          <IonButton type="submit">Submit</IonButton>
        </form>
      </IonModal>
    </>
  );
};

export default ChallengeBox;
