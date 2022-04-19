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
import "./Register.css";
import { personCircle } from "ionicons/icons";
import { getViewerStatus, viewerStatus } from "../../data/viewerStatus";
import React from "react";
import { Router, useHistory, useParams } from "react-router";
import { register } from "../../data/authAPI";

const RegisterPage: React.FC = () => {
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
    await setPage();

    setCheckedParams(params.registerPath);

    setViewEnter(true);
  });

  const setPage = async () => {};

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
            {checkParams === "_admin"
              ? "Create new admin account"
              : "Create new account"}
          </IonTitle>
          {/* <IonButton routerLink="/login">
            login
          </IonButton> */}
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
              confirmPassword: { value: string };
            };
            const name = target.username.value;
            const role = params.registerPath === "_user" ? "user" : "admin";
            const email = target.email.value;
            const password = target.password.value;
            const confirmPassword = target.confirmPassword.value;
            //console.log(name, role, email, password, confirmPassword);

            if (password !== confirmPassword) {
              alert("confirm passord is incorrect");
            }

            const token = register(
              name,
              role,
              email,
              password,
              confirmPassword
            );

            // token.then((data) => {
            //   console.log(data);
            // });

            token
              .then((thisData) => {
                sessionStorage.setItem("current_token", thisData?.data?.token);
              })
              .then(() => {
                window.location.replace("/");
              });
          }}
        >
          <IonItem>
            <IonLabel position="stacked">Username</IonLabel>
            <IonInput
              name="username"
              type="text"
              value={userName}
              required
              placeholder="Enter username"
            ></IonInput>
          </IonItem>
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
          <IonItem>
            <IonLabel position="stacked">Confirm password</IonLabel>
            <IonInput
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              required
              placeholder="Enter the same password as above"
            ></IonInput>
          </IonItem>
          <IonButton type="submit">Submit</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
