import { useState } from "react";
import {
  IonButton,
  IonButtons,
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
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import "./Home.css";
import { getAllChallengeThisChapter, getAllChapter } from "../data/chapterAPI";
import ChallengeListBox from "../components/ChallengeListBox/ChallengeListBox";
import { personCircle } from "ionicons/icons";
import React from "react";
import { getCurrentUser } from "../data/userAPI";
import { logout } from "../data/authAPI";
import StoryList from "../components/StoryList/StoryList";
import { getAllStory } from "../data/storyAPI";

const Home: React.FC = () => {
  const [User, setUser] = useState<any>(null);
  const [allChapter, setAllChapter] = useState<any[]>([]);
  const [allStory, setAllStory] = useState<any[]>([]);

  const ThisContent = React.useRef<HTMLIonContentElement>(null);
  const [ChapterList, setChapterList] = useState<HTMLIonTitleElement[]>([]);

  const [viewEntered, setViewEnter] = useState<boolean>();

  const types = ["Challenge", "Story"];
  const [tabActive, setTabActive] = useState(types[0]);
  var [selectedChapter, setSelectedChapter] = useState<number>(0);

  useIonViewWillEnter(async () => {
    setViewEnter(false);

    await setPage();

    setViewEnter(true);
  });

  useIonViewWillLeave(async () => {
    setViewEnter(false);
  });

  async function setPage() {
    await getCurrentUser().then((user) => {
      if (user) {
        setUser(user.data);
        //console.log(user);
      } else {
        console.log("plz login");
      }
    });

    const chapters: any[] = (await Promise.resolve(getAllChapter())).data;
    setAllChapter(chapters);

    for (let i = 0; i < chapters.length; i++) {
      const val = (
        await Promise.resolve(getAllChallengeThisChapter(chapters[i].id))
      ).data;
      chapters[i].challenges = val;
    }

    const stories = (await Promise.resolve(getAllStory())).data.data;
    //console.log(stories);
    setAllStory(stories);
  }

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
    window.location.reload();

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
          <IonButton
            routerLink="/admin"
            slot="start"
            style={{ display: User?.role === "admin" ? "block" : "none" }}
          >
            Edit
          </IonButton>
          <IonIcon
            className="mr-auto"
            icon={personCircle}
            slot="end"
            color="primary"
          ></IonIcon>
          <IonLabel slot="end">{User == null ? "guest" : User?.name}</IonLabel>
          <IonButton
            slot="end"
            style={{ display: User ? "block" : "none" }}
            onClick={(e) =>
              logout().then(() => {
                window.location.reload();
              })
            }
          >
            Logout
          </IonButton>
          <IonButton
            slot="end"
            routerLink="/login"
            style={{ display: User ? "none" : "block" }}
          >
            Login
          </IonButton>
          <IonButton
            slot="end"
            routerLink="/register_user"
            style={{ display: User ? "none" : "block" }}
          >
            Sign up
          </IonButton>
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

        <IonButtons className="tab-bar">
          {types.map((type) => (
            <IonButton
              key={type}
              className={tabActive === type ? "tab active" : "tab"}
              onClick={() => setTabActive(type)}
            >
              {type}
            </IonButton>
          ))}
        </IonButtons>

        <div style={{ display: tabActive === "Challenge" ? "flex" : "none" }}>
          <IonItem class="chapterSelection">
            <IonLabel position="stacked">Chapter</IonLabel>
            <IonSelect
              className="dropdownChapter"
              interface="popover"
              value={selectedChapter}
              onIonChange={(e) => scrollToView(e)}
            >
              <IonSelectOption value={0}>
                Select Chapter to play
              </IonSelectOption>
              {allChapter.map((c) => (
                <IonSelectOption key={c.id} value={c.id}>
                  {c.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          {/* <IonItem>
            <IonButton routerLink="/gallery">
              <IonLabel>Story Gallery</IonLabel>
            </IonButton>
          </IonItem> */}
        </div>

        {viewEntered && tabActive === "Challenge"
          ? allChapter.map((chapter) => (
              <div className="my-16" key={chapter.id}>
                <IonTitle ref={(ref) => ChapterList?.push(ref!)}>
                  Chapter {chapter.name}
                </IonTitle>
                <ChallengeListBox ChallengeThisChapter={chapter.challenges} />
              </div>
            ))
          : null}

        {tabActive === "Story" ? <StoryList stories={allStory} /> : null}
      </IonContent>
    </IonPage>
  );
};

export default Home;
