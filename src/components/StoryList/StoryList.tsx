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

interface StoryListBoxProps {
  stories: any[];
}

const StoryListBox: React.FC<StoryListBoxProps> = ({ stories }) => {
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

export default StoryListBox;
