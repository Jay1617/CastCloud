import React from "react";
import Layout from "../components/Layout";
import { PodcastData } from "../context/Podcast";
import AlbumItem from "../components/AlbumItem";

function Home() {
  const { podcasts, albums } = PodcastData();

  return (
    <Layout>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albums.map((e, i) => (
            <AlbumItem
              key={i}
              image={e.thumbnail.url}
              name={e.title}
              desc={e.description}
              id={e._id}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        <div className="flex overflow-auto">
          {}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
