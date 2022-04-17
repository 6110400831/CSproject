import { LegacyRef, useEffect, useRef, useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
  IonVirtualScroll,
  useIonViewDidLeave,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Admin.css";
import { personCircle } from "ionicons/icons";
import React from "react";
import {
  createChapter,
  getAllChallengeThisChapter,
  getAllChapter,
  updateChapter,
} from "../../data/chapterAPI";
import ChallengeListBox from "../../components/ChallengeListBox/ChallengeListBox";
import { getCurrentUser } from "../../data/userAPI";
import { logout } from "../../data/authAPI";

const AdminPage: React.FC = () => {
  const [allChapter, setAllChapter] = useState<any[]>([]);
  const [User, setUser] = useState<any>(null);

  const ThisContent = React.useRef<HTMLIonContentElement>(null);
  const [ChapterList, setChapterList] = useState<HTMLIonTitleElement[]>([]);

  const [formRef, setFormRef] = useState<LegacyRef<HTMLFormElement>>();
  const [chapterName, setChapterName] = useState<string>("");
  const [chapterDescription, setChapterDescription] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [viewEntered, setViewEnter] = useState<boolean>();

  const types = ["Challenge", "Story"];
  const [tabActive, setTabActive] = useState(types[0]);
  var [selectedChapter, setSelectedChapter] = useState<number>(0);

  useIonViewWillEnter(async () => {
    setViewEnter(false);

    await setPage();
    await getCurrentUser().then((user) => {
      if (user) {
        setUser(user.data);
        //console.log(user);
      } else {
        console.log("plz login");
      }
    });

    setViewEnter(true);
  });

  const setPage = async () => {
    const chapters: any[] = (await Promise.resolve(getAllChapter())).data;
    setAllChapter(chapters);

    for (let i = 0; i < chapters.length; i++) {
      const val = (
        await Promise.resolve(getAllChallengeThisChapter(chapters[i].id))
      ).data;
      chapters[i].challenges = val;
    }
    //setAllChallenge(challengeList);
  };

  function scrollToView(e: any) {
    setSelectedChapter(e.detail.value);

    ThisContent.current?.scrollToPoint(
      0,
      ChapterList[Number(e.detail.value)]?.offsetTop - 60,
      1000
    );
  }

  function setChapterFormValue() {
    setShowModal(true);

    if (selectedChapter !== 0) {
      allChapter.forEach((el) => {
        if (el.id === selectedChapter) {
          setChapterName(el.name);
          setChapterDescription(el.description);
        }
      });
    } else {
      setChapterName("");
      setChapterDescription("");
    }
  }

  const refresh = async (e: CustomEvent) => {
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
          <IonLabel slot="end">{User == null ? "guest" : User?.name}</IonLabel>
          <IonButton
            slot="end"
            style={{ display: User ? "block" : "none" }}
            onClick={(e) =>
              logout().then(() => {
                window.location.replace("/");
              })
            }
          >
            Logout
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
              <IonSelectOption value={0} onClick={() => console.log("hello")}>
                Add new chapter
              </IonSelectOption>
              {allChapter.map((c) => (
                <IonSelectOption key={c.id} value={c.id}>
                  {c.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonButton onClick={() => setChapterFormValue()}>
              <IonLabel>
                {selectedChapter === 0
                  ? "Create New Chapter"
                  : "Edit This Chapter"}
              </IonLabel>
            </IonButton>
          </IonItem>
        </div>

        {viewEntered && tabActive === "Challenge"
          ? allChapter.map((chapter) => (
              <div className="my-16" key={chapter.id}>
                <IonTitle ref={(ref) => ChapterList?.push(ref!)}>
                  Chapter {chapter.name}
                </IonTitle>
                <ChallengeListBox
                  ChallengeThisChapter={chapter.challenges}
                  adminEntered={true}
                  ChapterId={chapter.id}
                />
              </div>
            ))
          : null}
      </IonContent>

      <IonModal
        className="editChapterModal"
        isOpen={showModal}
        swipeToClose={true}
        onDidDismiss={() => setShowModal(false)}
      >
        <form
          ref={formRef}
          onSubmit={async (e: React.SyntheticEvent) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              chapterName: { value: string };
              chapterDescription: { value: string };
            };
            const name = target.chapterName.value;
            const description = target.chapterDescription.value;

            if (selectedChapter === 0) {
              await createChapter(name, description);
            } else {
              await updateChapter(selectedChapter!, name, description);
            }

            window.location.reload();
          }}
        >
          <IonItem>
            <IonLabel position="stacked">Chapter Name</IonLabel>
            <IonInput
              name="chapterName"
              id="edit-name"
              type="text"
              value={chapterName}
              required
              placeholder="Enter new chapter name"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea
              name="chapterDescription"
              id="edit-description"
              value={chapterDescription}
              placeholder="Enter chapter description"
            ></IonTextarea>
          </IonItem>
          <IonButton type="submit">Submit</IonButton>
        </form>
      </IonModal>
    </IonPage>
  );
};

export default AdminPage;
