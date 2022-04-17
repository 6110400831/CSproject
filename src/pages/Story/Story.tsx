import React, { useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { personCircle } from "ionicons/icons";
import { useParams } from "react-router";
import "./Story.css";
import { challenge } from "../../data/challenge";
import { chapter, getChallenge, getChapter } from "../../data/chapter";
import { getViewerStatus, viewerStatus } from "../../data/viewerStatus";
import { story, thisStories } from "../../data/storyImage";
import { getAllStory } from "../../data/storyAPI";
import StoryList from "../../components/StoryList/StoryList";

function StoryPage() {
  const [Chapter, setChapter] = useState<chapter>();
  const [Challenge, setChallenge] = useState<challenge>();
  const [allStory, setAllStory] = useState<story[]>([]);
  const [viewer, setViewer] = useState<string>();

  useIonViewWillEnter(() => {
    setViewer(getViewerStatus);

    setPage();
  });

  const setPage = async () => {
    const stories = (await Promise.resolve(getAllStory())).data.data;
    console.log(stories);
    setAllStory(stories);
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar className="d-in-flex">
          <>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home"></IonBackButton>
            </IonButtons>
            <IonLabel>Story Gallery</IonLabel>
          </>

          <IonIcon
            className="mr-auto"
            icon={personCircle}
            slot="end"
            color="primary"
          ></IonIcon>
          <IonLabel className="ion-text-wrap mr-auto" slot="end">
            {viewer}
          </IonLabel>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="px-32">
        <StoryList stories={allStory} />
      </IonContent>
    </IonPage>
  );
}

export default StoryPage;
