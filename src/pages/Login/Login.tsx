import { LegacyRef, useState } from "react";
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
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  LocationHistory,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Login.css";
import { personCircle } from "ionicons/icons";
import { getViewerStatus, viewerStatus } from "../../data/viewerStatus";
import React from "react";
import { Router, useHistory, useParams } from "react-router";
import { login, register } from "../../data/authAPI";

const LoginPage: React.FC = () => {
  const ThisContent = React.useRef<HTMLIonContentElement>(null);

  const [formRef, setFormRef] = useState<LegacyRef<HTMLFormElement>>();
  const [userName, setUserName] = useState<string>();
  const [Email, setEmail] = useState<string>();
  const [Password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const [checkParams, setCheckedParams] = useState<string>();

  const [viewer, setViewer] = useState<string>();
  const [viewEntered, setViewEnter] = useState<boolean>();

  const params = useParams<{ registerPath: string }>();

  useIonViewWillEnter(async () => {
    setViewer(getViewerStatus);
    await setPage();

    setCheckedParams(params.registerPath);

    setViewEnter(true);
  });

  const setPage = async (id?: number) => {};

  const refresh = async (e: CustomEvent) => {
    setViewEnter(false);
    setViewer(getViewerStatus);
    await setPage();

    setTimeout(() => {
      setViewEnter(true);
      e.detail.complete();
    }, 1000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle className="title" slot="start">
            {checkParams === "_admin"
              ? "Create new admin account"
              : "Create new account"}
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
        <form
          ref={formRef}
          onSubmit={async (e: React.SyntheticEvent) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              username: { value: string };
              email: { value: string };
              password: { value: string };
            };
            const email = target.email.value;
            const password = target.email.value;

            const token = login(email, password);

            token.then((thisData) => {
              sessionStorage.setItem("current_token", thisData?.data?.token);
              console.log(thisData?.data);
              if (thisData?.data?.role === "admin") {
                window.location.replace("/admin");
              } else {
                window.location.replace("/");
              }
            });
          }}
        >
          <IonItem>
            <IonLabel position="stacked">E-mail</IonLabel>
            <IonInput
              name="email"
              type="text"
              value={Email}
              required
              placeholder="Enter e-mail"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              name="password"
              type="password"
              value={Password}
              required
              placeholder="Enter password for this username"
            ></IonInput>
          </IonItem>
          <IonButton type="submit">login</IonButton>
          <IonButton routerLink="/register_user">Sign UP</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
