import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import ChallengePage from "./pages/Challenge/Challenge";
import AdminPage from "./pages/Admin/Admin";
import StoryPage from "./pages/Story/Story";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import RegisterPage from "./pages/Register/Register";
import LoginPage from "./pages/Login/Login";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Redirect from="/home" to="/" />

        <Route path="/admin" exact={true}>
          <AdminPage />
        </Route>

        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>

        <Route path="/register:registerPath" exact={true}>
          <RegisterPage />
        </Route>

        <Route path="/gallery" exact={true}>
          <StoryPage />
        </Route>

        <Route path="/challenge/:chapterId/:challengeId" exact={true}>
          <ChallengePage />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
