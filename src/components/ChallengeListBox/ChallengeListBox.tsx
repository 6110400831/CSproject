import { IonItem, IonSlides } from "@ionic/react";
import { chapter } from "../../data/chapter";
import ChallengeBox from "../ChallengeBox/ChallengeBox";
import "./ChallengeListBox.css";

interface ChallengeListBoxProps {
  Chapter: chapter;
}

const slideConfig = {
  initialSlide: 0,
  slidesPerView: 1,
  grabCursor: true,
  allowSlideNext: true,
  allowSlidePrev: true,
  allowTouchMove: true,
};

const ChallengeListBox: React.FC<ChallengeListBoxProps> = ({ Chapter }) => {
  return (
    <IonSlides className="challenge-slides" options={slideConfig}>
      {Chapter.challengeList.map((c) => (
        <ChallengeBox key={c.id} Challenge={c} chapterId={Chapter.id} />
      ))}
    </IonSlides>
  );
};

export default ChallengeListBox;
