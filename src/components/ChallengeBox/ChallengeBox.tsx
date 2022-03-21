import { IonItem } from "@ionic/react";
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
    <>
      <IonItem routerLink={`/${chapterId}/${Challenge.id}`} detail={false}>
        {Challenge.name}
      </IonItem>
    </>
  );
};

export default ChallengeBox;
