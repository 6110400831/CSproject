import { LegacyRef, useEffect, useRef, useState } from "react";
import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonChip,
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
import StoryList from "../../components/StoryList/StoryList";
import { createStory, getAllStory } from "../../data/storyAPI";

const AdminPage: React.FC = () => {
  const [allChapter, setAllChapter] = useState<any[]>([]);
  const [User, setUser] = useState<any>(null);
  const [allStory, setAllStory] = useState<any[]>([]);

  const ThisContent = React.useRef<HTMLIonContentElement>(null);
  const [ChapterList, setChapterList] = useState<HTMLIonTitleElement[]>([]);

  const [formRef, setFormRef] = useState<LegacyRef<HTMLFormElement>>();
  const [chapterName, setChapterName] = useState<string>("");
  const [chapterDescription, setChapterDescription] = useState<string>("");

  const [formStoryRef, setFormStoryRef] =
    useState<LegacyRef<HTMLFormElement>>();
  const [storyName, setStoryName] = useState<string>("");
  const [storyDescription, setStoryDescription] = useState<string>("");
  const [condition, setConditon] = useState<number>(0);
  const [image, setImage] = useState<any>();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [viewEntered, setViewEnter] = useState<boolean>();
  const [showStoryModal, setShowStoryModal] = useState<boolean>(false);

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

    // console.log(
    //   sessionStorage.getItem("finished_challenge")?.split(",").length
    // );
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
    const stories = (await Promise.resolve(getAllStory())).data.data;
    //console.log(stories);
    setAllStory(stories);
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

  const uploadPhoto = async (fileChangeEvent: any) => {
    if (fileChangeEvent.target.files[0]) {
      const photo = await URL.createObjectURL(fileChangeEvent.target.files[0]);
      var img = new Image();
      img.src = photo;
      img.crossOrigin = "Anonymous";
      setImage(photo);
    }
  };

  function setStoryFormValue() {
    setStoryName("");
    setStoryDescription("");
    setConditon(0);
    setImage(null);

    setShowStoryModal(true);
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
          <IonChip slot="end">
            <IonIcon
              className="mr-auto"
              icon={personCircle}
              color="primary"
            ></IonIcon>
            <IonBadge color="tertiary" style={{ marginRight: "16px" }}>
              {User == null ? "guest" : User?.name}
            </IonBadge>
          </IonChip>
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

        {tabActive === "Story" ? (
          <>
            <IonButton onClick={setStoryFormValue}>Create New Story</IonButton>
            <StoryList stories={allStory} />
          </>
        ) : null}
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

      <IonModal
        className="editStoryModal"
        isOpen={showStoryModal}
        swipeToClose={true}
        onDidDismiss={() => setShowStoryModal(false)}
      >
        <form
          ref={formStoryRef}
          onSubmit={async (e: React.SyntheticEvent) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              storyName: { value: string };
              storyDescription: { value: string };
              condition: { value: number };
              imageFile: { value: any };
            };
            const name = target.storyName.value;
            const description = target.storyDescription.value;
            const condition = target.condition.value;
            const image = target.imageFile.value;

            const json = {
              name: name,
              description: description,
              condition: condition,
            };
            //console.log(name, description, condition, image);
            console.log(JSON.stringify(json));
            createStory(image, JSON.stringify(json));

            // window.location.reload();
          }}
        >
          <IonItem>
            <IonLabel position="stacked">Story Name</IonLabel>
            <IonInput
              name="storyName"
              type="text"
              value={storyName}
              required
              placeholder="Enter new story name"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Story Description</IonLabel>
            <IonTextarea
              name="storyDescription"
              value={storyDescription}
              placeholder="Enter this story description"
              required
            ></IonTextarea>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Condition</IonLabel>
            <IonInput
              name="condition"
              type="number"
              value={condition}
              min="0"
              required
              placeholder="Enter the number of challenge to unlock story"
            ></IonInput>
          </IonItem>
          <input
            name="imageFile"
            type="file"
            onChange={(ev) => uploadPhoto(ev)}
            accept="image/png, image/jpeg"
            required
          ></input>
          <img
            src={image}
            width="300"
            height="300"
            id="canvas"
            alt="preview img"
            style={{ display: image ? "block" : "none" }}
          />
          <IonButton type="submit">Submit</IonButton>
        </form>
      </IonModal>
    </IonPage>
  );
};

export default AdminPage;
