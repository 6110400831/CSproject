import {
  IonButton,
  IonicSlides,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonSlides,
  IonTextarea,
} from "@ionic/react";
import html2canvas from "html2canvas";
import { LegacyRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { createChallenge } from "../../data/challengeAPI";
import { chapter } from "../../data/chapter";
import { getAllChallengeThisChapter } from "../../data/chapterAPI";
import ChallengeBox from "../ChallengeBox/ChallengeBox";
import "./ChallengeListBox.css";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

interface ChallengeListBoxProps {
  ChallengeThisChapter: any[];
  adminEntered?: boolean;
  ChapterId?: number;
}

const slideNumber: Number = Math.floor(Number(window.innerWidth / 300));

// const slideConfig = {
//   initialSlide: 0,
//   slidesPerView: slideNumber,
//   grabCursor: true,
//   allowSlideNext: true,
//   allowSlidePrev: true,
//   allowTouchMove: true,
// };

const ChallengeListBox: React.FC<ChallengeListBoxProps> = ({
  ChallengeThisChapter,
  adminEntered,
  ChapterId,
}) => {
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

  function setNewChallengeFormValue() {
    setChallengeName("");
    setChallengeDescription("");
    setChallengeHint("");
    setImage(null);

    setShowModal(true);
  }

  return (
    <>
      <Swiper
        navigation
        className="challenge-slides"
        slidesPerView={Number(slideNumber)}
        modules={[IonicSlides, Navigation]}
      >
        {ChallengeThisChapter.length === 0 && !adminEntered ? (
          <div>coming soon</div>
        ) : (
          ChallengeThisChapter.map((val: any) => (
            <SwiperSlide className="challenge-silde" key={val.id}>
              <div onClick={() => {}}>
                <ChallengeBox
                  Challenge={val}
                  chapterId={val.chapter_id}
                  adminEntered={adminEntered}
                />
              </div>
            </SwiperSlide>
          ))
        )}

        {adminEntered ? (
          <div slot="wrapper-end">
            <IonButton onClick={setNewChallengeFormValue}>EDIT HERE</IonButton>
          </div>
        ) : null}
      </Swiper>

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
            };
            const name = target.challengeName.value;
            const description = target.challengeDescription.value;
            const hint = target.challengeHint.value;

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
            const challengeImage = canvas.toDataURL("image/png", 1.0);
            console.log(challengeImage);
            //console.log(name, description, hint, ChapterId, challengeImage);

            await createChallenge(
              name,
              description,
              hint,
              ChapterId,
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
            type="file"
            onChange={(ev) => uploadPhoto(ev)}
            accept="image/png, image/jpeg"
            required
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

export default ChallengeListBox;
