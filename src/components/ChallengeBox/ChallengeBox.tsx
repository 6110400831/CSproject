import { IonImg, IonItem, IonSlide } from "@ionic/react";
import { challenge } from "../../data/challenge";
import "./ChallengeBox.css";

interface ChallengeBoxProps {
  Challenge: any;
  chapterId: number;
}

const ChallengeBox: React.FC<ChallengeBoxProps> = ({
  Challenge,
  chapterId,
}) => {
  return (
    <IonItem
      className="box"
      // href={`/challenge/${chapterId}/${Challenge.id}`}
      routerLink={`/challenge/${chapterId}/${Challenge.id}`}
    >
      <div className="d-flex f-column align-center">
        <IonImg
          className="target-image"
          // src={window.location.origin + Challenge?.image}
          src={"http://localhost:8000/" + Challenge.image}
        ></IonImg>
        {Challenge.name}
      </div>
    </IonItem>
  );
};

export default ChallengeBox;
