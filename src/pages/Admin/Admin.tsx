import { useEffect, useRef, useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
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
  IonVirtualScroll,
  useIonViewDidLeave,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Admin.css";
import { chapter, getChapters } from "../../data/chapter";
import ChallengeListBox from "../../components/ChallengeListBox/ChallengeListBox";
import { personCircle } from "ionicons/icons";
import { getViewerStatus, viewerStatus } from "../../data/viewerStatus";
import React from "react";
import axios from "axios";

const AdminPage: React.FC = () => {
  const [Chapters, setChapters] = useState<chapter[]>([]);

  const ThisContent = React.useRef<HTMLIonContentElement>(null);
  const [ChapterList, setChapterList] = useState<HTMLIonTitleElement[]>([]);

  const [viewEntered, setViewEnter] = useState<boolean>();
  const [viewer, setViewer] = useState<string>();

  var [selectedChapter, setSelectedChapter] = useState<number>();

  useIonViewWillEnter(() => {
    setViewer(getViewerStatus);
    setChapters(getChapters());

    //console.log(getAllChallenge().then((val) => console.log(val.data)));

    setViewEnter(true);
  });

  // const getAllChallenge = async () => {
  //   const http = await axios({
  //     method: "get",
  //     url: "http://localhost:8000/api/testGetChallenge",
  //   });
  //   console.log("why?");
  //   return http;
  // };

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
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle className="title" slot="start">
            EDIT THE BOX
          </IonTitle>
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
              {Chapters.map((c) => (
                <IonSelectOption key={c.id} value={c.id}>
                  {c.chapterName}
                </IonSelectOption>
              ))}
              <IonSelectOption>Add new chapter</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonButton>
              <IonLabel>Edit this Chapter</IonLabel>
            </IonButton>
          </IonItem>
        </div>

        {viewEntered
          ? Chapters.map((chapter) => (
              <div className="mx-16" key={chapter.id}>
                <IonTitle ref={(ref) => ChapterList?.push(ref!)}>
                  {chapter.chapterName}
                </IonTitle>
                {/* <ChallengeListBox Chapter={chapter} adminEntered={true} /> */}
              </div>
            ))
          : null}

        {/* <IonButton
      onClick={(e) => console.log(Chapters[selectedChapter])}
    ></IonButton> */}
      </IonContent>
    </IonPage>
  );
};

export default AdminPage;
