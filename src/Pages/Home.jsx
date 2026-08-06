import SkyBackground from "../Components/SkyBackground";

import HeaderCard from "../Components/Home/HeaderCard";
import NextClassCard from "../Components/Home/NextClassCard";
import TodayTimeline from "../Components/Home/TodayTimeline";
import TasksPreview from "../Components/Home/TasksPreview";
import QuoteCard from "../Components/Home/QuoteCard";

function Home() {

  return (

    <SkyBackground>

      <main
        className="
          min-h-screen
          max-w-xl
          mx-auto
          px-6
          pt-8
          pb-36
        "
      >

        <HeaderCard />

        <div className="mt-6">
          <NextClassCard />
        </div>

        <div className="mt-8">
          <TodayTimeline />
        </div>

        <div className="mt-8">
          <TasksPreview />
        </div>

        <div className="mt-8">
          <QuoteCard />
        </div>

      </main>

    </SkyBackground>

  );

}

export default Home;