import {
  IonItem,
  IonLabel,
  IonList,
  IonNote
} from '@ionic/react';
import { challenge } from '../../data/challenge';
import { chapter, getChapters } from '../../data/chapter';
import ChallengeBox from '../ChallengeBox/ChallengeBox';
import './ChallengeListBox.css';

interface ChallengeListBoxProps {
  Chapter: chapter;
}

const listBoxStyle = {
  display: 'flex',
};

const ChallengeListBox: React.FC<ChallengeListBoxProps> = ({ Chapter }) => {
  return (
    <IonItem>
      <IonList style={listBoxStyle}>
        {Chapter.challengeList.map(c => <ChallengeBox key={c.id} Challenge={c} chapterId={Chapter.id} />)}
      </IonList>
    </IonItem>
  );
};

export default ChallengeListBox;
