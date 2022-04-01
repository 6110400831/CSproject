import { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
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
import { getAllChallengeThisChapter, getAllChapter } from "../data/chapterAPI";
import ChallengeListBox from "../components/ChallengeListBox/ChallengeListBox";
import { personCircle } from "ionicons/icons";
import { getViewerStatus, viewerStatus } from "../data/viewerStatus";
import React from "react";

const Home: React.FC = () => {
  const [allChapter, setAllChapter] = useState<any[]>([]);
  const [allChallenge, setAllChallenge] = useState<any[]>([]);

  const ThisContent = React.useRef<HTMLIonContentElement>(null);
  const [ChapterList, setChapterList] = useState<HTMLIonTitleElement[]>([]);

  const [viewEntered, setViewEnter] = useState<boolean>();
  const [viewer, setViewer] = useState<string>();

  var [selectedChapter, setSelectedChapter] = useState<number>();

  useIonViewWillEnter(async () => {
    setViewer(getViewerStatus);
    // setChapters(getChapters());
    const chapters: any[] = (await Promise.resolve(getAllChapter())).data;
    setAllChapter(chapters);

    let challengeList: any[] = [];
    for (let i = 0; i < chapters.length; i++) {
      const val = (
        await Promise.resolve(getAllChallengeThisChapter(chapters[i].id))
      ).data;
      challengeList[i] = [...val];
    }
    setAllChallenge(challengeList);

    setSelectedChapter(1);
    setViewEnter(true);
  });

  function scrollToView(e: any) {
    setSelectedChapter(e.detail.value);
    //console.log(ThisContent);
    ThisContent.current?.scrollToPoint(
      0,
      ChapterList[Number(e.detail.value)]?.offsetTop - 60,
      1000
    );
    //console.log(ChapterList[Number(selectedChapter)]);
  }

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 1000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title" slot="start">
            CSS with CAT
          </IonTitle>
          {/* <IonButton routerLink="/admin" slot="start">
            edit
          </IonButton> */}
          <IonIcon
            className="mr-auto"
            icon={personCircle}
            slot="end"
            color="primary"
          ></IonIcon>
          <IonLabel slot="end">{viewer}</IonLabel>
        </IonToolbar>
      </IonHeader>

      <IonContent
        ref={ThisContent}
        fullscreen
        overflow-scroll="true"
        scrollEvents={true}
        onIonScrollStart={() => {}}
        onIonScroll={() => {}}
        onIonScrollEnd={() => {}}
      >
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">CS Project</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="d-flex">
          <IonItem class="chapterSelection">
            <IonLabel position="floating">Chapter</IonLabel>
            <IonSelect
              className="dropdownChapter"
              interface="popover"
              value={selectedChapter}
              onIonChange={(e) => scrollToView(e)}
            >
              {allChapter.map((c) => (
                <IonSelectOption key={c.id} value={c.id}>
                  {c.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonButton routerLink="/gallery">
              <IonLabel>Story Gallery</IonLabel>
            </IonButton>
          </IonItem>
        </div>

        {viewEntered
          ? allChapter.map((chapter) => (
              <div className="my-16" key={chapter.id}>
                <IonTitle ref={(ref) => ChapterList?.push(ref!)}>
                  {chapter.name}
                </IonTitle>
                <ChallengeListBox
                  ChallengeThisChapter={allChallenge[chapter.id - 1]}
                />
              </div>
            ))
          : null}
      </IonContent>
    </IonPage>
  );
};

export default Home;
