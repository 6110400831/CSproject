import {
  IonButton,
  IonicSlides,
  IonImg,
  IonSlide,
  IonSlides,
} from "@ionic/react";
import { story } from "../../data/storyImage";
import "./StoryList.css";
import { Swiper, SwiperSlide } from "swiper/react";

interface ChallengeListBoxProps {
  stories: any[];
}

// const slideNumber: Number = Math.floor(Number(window.innerWidth / 300));

// const slideConfig = {
//   initialSlide: 1,
//   slidesPerView: 1,
//   grabCursor: true,
//   allowSlideNext: true,
//   allowSlidePrev: true,
//   allowTouchMove: true,
//   speed: 400,
// };

const ChallengeListBox: React.FC<ChallengeListBoxProps> = ({ stories }) => {
  return (
    <div className="stories">
      {stories.map((story) => (
        <SwiperSlide key={story.id}>
          <IonImg id="story-image" src={story.image}></IonImg>
        </SwiperSlide>
      ))}
    </div>
  );
};

export default ChallengeListBox;
