import {
  IonItem,
  IonLabel,
  IonList,
  IonNote
} from '@ionic/react';
import { challenge } from '../../data/challenge';
import { chapter, getChapters } from '../../data/chapter';
import './ChallengeListBox.css';

interface ChallengeListBoxProps {
  ChallengeList: challenge[];
}

const listBoxStyle = {
  display: 'flex',
};

const ChallengeListBox: React.FC<ChallengeListBoxProps> = ({ ChallengeList }) => {
  return (
    <IonList style={listBoxStyle}>
      {ChallengeList.map(c => <IonItem routerLink={`/q${c.id}`} detail={false}>
        {c.name}
      </IonItem>)}
    </IonList>
  );
};

export default ChallengeListBox;
