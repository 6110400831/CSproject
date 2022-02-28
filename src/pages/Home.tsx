import { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './Home.css';
import { chapter, getChapters } from '../data/chapter';
import ChallengeListBox from '../components/ChallengeListBox/ChallengeListBox';
import { challenge, getChallengeList } from '../data/challenge';

const Home: React.FC = () => {

  const [Chapters, setChapters] = useState<chapter[]>([]);

  const [Challenge, setChallengeList] = useState<challenge[]>([]);

  let selectedChapter: number = 0;

  useIonViewWillEnter(() => {
    setChapters(getChapters());
    setChallengeList(getChallengeList());
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const chapterSelectionStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>CS Project</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              CS Project
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <div style={chapterSelectionStyle}>
          <IonItem class='chapterSelection'>
            <IonLabel position="floating">Chapter</IonLabel>
            <IonSelect value="0" interface="popover" placeholder='Select Chapter' onIonChange={(e: any) => (selectedChapter = e.target.value)}>
              {Chapters.map(c => <IonSelectOption value={c.id}>{c.chapterName}</IonSelectOption>)}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonButton>
              <IonLabel>Story Gallery</IonLabel>
            </IonButton>
          </IonItem>
        </div>

        <IonList>
          {Chapters.map(c => <ChallengeListBox key={c.id ?? c.id === selectedChapter} ChallengeList={c.challengeList} />)}
        </IonList>

        <div>{selectedChapter}</div>
        {/* <IonList>
          {messages.map(m => <MessageListItem key={m.id} message={m} />)}
        </IonList> */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
