import SkyBackground from "../Components/SkyBackground";

import ProfileHeader from "../Components/Profile/ProfileHeader";
import StatsCard from "../Components/Profile/StatsCard";
import SettingsCard from "../Components/Profile/SettingsCard";

function Profile() {

  return (

    <SkyBackground>

      <main
        className="
          max-w-xl
          mx-auto
          px-6
          pt-8
          pb-36
          min-h-screen
        "
      >

        <ProfileHeader />

        <div className="mt-8">

          <StatsCard />

        </div>

        <div className="mt-8">

          <SettingsCard />

        </div>

      </main>

    </SkyBackground>

  );

}

export default Profile;