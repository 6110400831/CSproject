import { useState } from 'react';
import {
    IonBackButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonNote,
    IonPage,
    IonRow,
    IonToolbar,
    useIonViewWillEnter,
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { useParams } from 'react-router';
import './Challenge.css';
import { challenge } from '../../data/challenge';
import { chapter, getChallenge, getChapter } from '../../data/chapter';

function ChallengePage() {
    const [Chapter, setChapter] = useState<chapter>();
    const [Challenge, setChallenge] = useState<challenge>();

    const params = useParams<{ chapterId: string, challengeId: string }>();

    useIonViewWillEnter(() => {
        // console.log(params.name)
        // console.log(parseInt(params.id))

        setChapter(getChapter(parseInt(params.chapterId)))
        setChallenge(getChallenge(parseInt(params.chapterId), parseInt(params.challengeId)))
    });

    const pageStyle = {
        display: 'flex',
    };

    return (
        <IonPage>
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home"></IonBackButton>
                    </IonButtons>
                    <IonLabel>Chapter {Chapter?.chapterName} challenge {Challenge?.name}</IonLabel>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen style={pageStyle}>
                <IonItem>
                    <IonInput></IonInput>
                </IonItem>
                <IonItem>
                    <div>input</div>
                </IonItem>
                <IonItem>
                    <div>output</div>
                </IonItem>
            </IonContent>
        </IonPage>
    );
}

export default ChallengePage;
