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
          <div className="locker">
            <div
              className="greyBox"
              style={
                {
                  "--finished-number": sessionStorage.getItem(
                    "finished_challenge"
                  )
                    ? sessionStorage.getItem("finished_challenge")?.split(",")
                        .length!
                    : 0,
                  "--condition": story.condition,
                } as React.CSSProperties
              }
            ></div>
          </div>
        </SwiperSlide>
      ))}
    </div>
  );
};

export default StoryListBox;
