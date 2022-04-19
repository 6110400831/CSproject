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
import React from "react";
import { useParams } from "react-router";
import { login } from "../../data/authAPI";

const LoginPage: React.FC = () => {
  const ThisContent = React.useRef<HTMLIonContentElement>(null);

  const [formRef, setFormRef] = useState<LegacyRef<HTMLFormElement>>();
  const [Email, setEmail] = useState<string>();
  const [Password, setPassword] = useState<string>();

  const [checkParams, setCheckedParams] = useState<string>();

  const [viewEntered, setViewEnter] = useState<boolean>();

  const params = useParams<{ registerPath: string }>();

  useIonViewWillEnter(async () => {
    await setPage();

    setCheckedParams(params.registerPath);

    setViewEnter(true);
  });

  const setPage = async (id?: number) => {};

  const refresh = async (e: CustomEvent) => {
    setViewEnter(false);
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
              email: { value: string };
              password: { value: string };
            };
            const email = target.email.value;
            const password = target.password.value;

            const token = login(email, password);

            token.then((thisData) => {
              sessionStorage.setItem("current_token", thisData?.data?.token);
              //console.log(thisData?.data);
              if (thisData?.data === undefined) {
                alert("email or password is wrong please try again");
              } else if (thisData?.data?.role === "admin") {
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
          <div className="d-flex jus-around">
            <IonButton routerLink="/register_user">Sign UP</IonButton>
            <IonButton type="submit">login</IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
