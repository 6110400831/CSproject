import { IonImg, IonItem, IonSlide } from "@ionic/react";
import { challenge } from "../../data/challenge";
import "./ChallengeBox.css";

interface ChallengeBoxProps {
  Challenge: challenge;
  chapterId: number;
}

const ChallengeBox: React.FC<ChallengeBoxProps> = ({
  Challenge,
  chapterId,
}) => {
  return (
    <IonSlide className="challenge-silde">
      <IonItem
        className="box"
        href={`/challenge/${chapterId}/${Challenge.id}`}
        // routerLink={`/challenge/${chapterId}/${Challenge.id}`}
      >
        <div className="d-flex f-column align-center">
          <IonImg
            className="target-image"
            src={window.location.origin + Challenge?.image}
          ></IonImg>
          {Challenge.name}
        </div>
      </IonItem>
    </IonSlide>
  );
};

export default ChallengeBox;
