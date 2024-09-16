import { currentUser } from "@clerk/nextjs/server";
import MuxPlayer from "@mux/mux-player-react/lazy";
import React from "react";

const OurMuxPlayer = async () => {
  const user = await currentUser();

  return (
    <div>
      <MuxPlayer
        theme="classic"
        streamType="on-demand"
        playbackId="VcdX65P6IlzEZyS6SUNcqGry1GZUm8padHHKpQ1CgdU"
        metadataVideoTitle="TeaserFest 2025 Promo"
        metadataViewerUserId={user?.primaryEmailAddress?.emailAddress}
        primaryColor="#FE3D02"
        accentColor="#FFF0F0"
        thumbnailTime={4}
        style={{
          aspectRatio: 16 / 9,
        }}
      />
    </div>
  );
};

export default OurMuxPlayer;
