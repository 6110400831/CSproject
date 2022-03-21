import { useState } from "react";
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
  useIonViewWillEnter,
} from "@ionic/react";
import "./Home.css";
import { chapter, getChapters } from "../data/chapter";
import ChallengeListBox from "../components/ChallengeListBox/ChallengeListBox";

const Home: React.FC = () => {
  const [Chapters, setChapters] = useState<chapter[]>([]);

  const [viewEntered, setViewEnter] = useState<boolean>();

  var [selectedChapter, setSelectedChapter] = useState<number>(0);

  useIonViewWillEnter(() => {
    setChapters(getChapters());
    setSelectedChapter(0);

    setViewEnter(true);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 1000);
  };

  const chapterSelectionStyle = {
    display: "flex",
    justifyContent: "space-between",
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
            <IonTitle size="large">CS Project</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div style={chapterSelectionStyle}>
          <IonItem class="chapterSelection">
            <IonLabel position="floating">Chapter</IonLabel>
            <IonSelect
              interface="popover"
              value={selectedChapter}
              onIonChange={(e) => setSelectedChapter(e.detail.value)}
            >
              {Chapters.map((c) => (
                <IonSelectOption key={c.id} value={c.id}>
                  {c.chapterName}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonButton>
              <IonLabel>Story Gallery</IonLabel>
            </IonButton>
          </IonItem>
        </div>

        {viewEntered ? (
          <IonList>
            {<ChallengeListBox Chapter={Chapters[selectedChapter]} />}
          </IonList>
        ) : null}

        {/* <IonButton
          onClick={(e) => console.log(Chapters[selectedChapter])}
        ></IonButton> */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
