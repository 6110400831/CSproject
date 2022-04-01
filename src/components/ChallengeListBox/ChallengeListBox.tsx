import { IonButton, IonicSlides, IonLabel, IonSlides } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { chapter } from "../../data/chapter";
import { getAllChallengeThisChapter } from "../../data/chapterAPI";
import ChallengeBox from "../ChallengeBox/ChallengeBox";
import "./ChallengeListBox.css";

interface ChallengeListBoxProps {
  ChallengeThisChapter: any[];
  adminEntered?: boolean;
}

const slideNumber: Number = Math.floor(Number(window.innerWidth / 300));

// const slideConfig = {
//   initialSlide: 0,
//   slidesPerView: slideNumber,
//   grabCursor: true,
//   allowSlideNext: true,
//   allowSlidePrev: true,
//   allowTouchMove: true,
// };

const ChallengeListBox: React.FC<ChallengeListBoxProps> = ({
  ChallengeThisChapter,
  adminEntered,
}) => {
  return (
    <Swiper
      className="challenge-slides"
      slidesPerView={Number(slideNumber)}
      modules={[IonicSlides]}
    >
      {ChallengeThisChapter.length === 0 ? (
        <div>coming soon</div>
      ) : (
        ChallengeThisChapter.map((val: any) => (
          <SwiperSlide className="challenge-silde" key={val.id}>
            <ChallengeBox Challenge={val} chapterId={val.chapter_id} />
          </SwiperSlide>
        ))
      )}

      {adminEntered ? (
        <div slot="wrapper-end">
          <IonButton>EDIT HERE</IonButton>
        </div>
      ) : null}
    </Swiper>
  );
};

export default ChallengeListBox;
