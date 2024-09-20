import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/User";
import { PodcastData } from "../context/Podcast";
import {
  MdDelete,
  MdHome,
  MdLibraryMusic,
  MdAddCircleOutline,
} from "react-icons/md";
import { FiUploadCloud } from "react-icons/fi";

function Admin() {
  const { user } = UserData();
  const {
    albums,
    podcasts,
    addAlbum,
    loading,
    addPodcast,
    addThumbnail,
    deletePodcast,
  } = PodcastData();

  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const [albumTitle, setAlbumTitle] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [albumFile, setAlbumFile] = useState(null);

  const [podcastTitle, setPodcastTitle] = useState("");
  const [podcastDescription, setPodcastDescription] = useState("");
  const [podcastFile, setPodcastFile] = useState(null);
  const [guest, setGuest] = useState("");
  const [album, setAlbum] = useState("");

  const fileChangeHandler = (e) => setPodcastFile(e.target.files[0]);

  const addAlbumHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", albumTitle);
    formData.append("description", albumDescription);
    formData.append("file", albumFile);
    addAlbum(formData, setAlbumTitle, setAlbumDescription, setAlbumFile);
  };

  const addPodcastHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", podcastTitle);
    formData.append("description", podcastDescription);
    formData.append("guest", guest);
    formData.append("album", album);
    formData.append("file", podcastFile);

    addPodcast(
      formData,
      setPodcastTitle,
      setPodcastDescription,
      setPodcastFile,
      setGuest,
      setAlbum
    );
  };

  const addThumbnailHandler = (id) => {
    const formData = new FormData();
    formData.append("file", podcastFile);
    addThumbnail(id, formData, setPodcastFile);
  };

  const deleteHandler = (id) => {
    if (confirm("Are you sure you want to delete this Podcast?")) {
      deletePodcast(id);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8 relative">
      <Link
        to="/"
        className="fixed bottom-8 right-8 bg-white hover:bg-[#EDEAE0] text-black font-bold py-3 px-4 rounded-full transition flex items-center gap-2 shadow-lg"
      >
        <MdHome size={24} />
        Go to Home
      </Link>

      <h2 className="text-3xl font-bold mb-8 mt-6 flex items-center gap-2">
        <MdLibraryMusic size={28} />
        Admin Panel - Manage Albums & Podcasts
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form
          onSubmit={addAlbumHandler}
          className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg space-y-4"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MdAddCircleOutline size={24} />
            Add New Album
          </h3>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              placeholder="Album Title"
              className="auth-input"
              value={albumTitle}
              onChange={(e) => setAlbumTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              placeholder="Album Description"
              className="auth-input"
              value={albumDescription}
              onChange={(e) => setAlbumDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Thumbnail</label>
            <input
              type="file"
              className="auth-input"
              accept="image/*"
              onChange={(e) => setAlbumFile(e.target.files[0])}
              required
            />
          </div>

          <button
            disabled={loading}
            className="auth-btn-admin bg-white hover:bg-gray-400  w-full py-2 text-black rounded-full transition flex items-center justify-center gap-2"
          >
            <FiUploadCloud size={20} />
            {loading ? "Please Wait..." : "Add Album"}
          </button>
        </form>

        <form
          onSubmit={addPodcastHandler}
          className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg space-y-4"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MdAddCircleOutline size={24} />
            Add New Podcast
          </h3>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              placeholder="Podcast Title"
              className="auth-input"
              value={podcastTitle}
              onChange={(e) => setPodcastTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              placeholder="Podcast Description"
              className="auth-input"
              value={podcastDescription}
              onChange={(e) => setPodcastDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Guests</label>
            <input
              type="text"
              placeholder="Guests"
              className="auth-input"
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Select Album</label>
            <select
              className="auth-input"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              required
            >
              <option value="">Select Album</option>
              {albums?.map((album, i) => (
                <option key={i} value={album._id}>
                  {album.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Audio File</label>
            <input
              type="file"
              className="auth-input"
              accept="audio/*"
              onChange={fileChangeHandler}
              required
            />
          </div>

          <button
            disabled={loading}
            className="auth-btn-admin bg-white hover:bg-gray-400 w-full py-2 text-black rounded-full transition flex items-center justify-center gap-2"
          >
            <FiUploadCloud size={20} />
            {loading ? "Please Wait..." : "Add Podcast"}
          </button>
        </form>
      </div>

      {/* Podcast List */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Added Podcasts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {podcasts?.map((podcast, i) => (
            <div
              key={i}
              className="bg-[#1a1a1a] p-6 rounded-lg shadow-md relative hover:shadow-lg transition-shadow"
            >
              {podcast.thumbnail ? (
                <img
                  src={podcast.thumbnail.url}
                  alt="Podcast Thumbnail"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              ) : (
                <div className="w-full h-40 bg-gray-700 rounded-md mb-4 flex items-center justify-center text-gray-400">
                  No Thumbnail
                </div>
              )}
              <h4 className="text-lg font-semibold mb-2">{podcast.title}</h4>
              <p className="text-gray-400 text-sm">{podcast.description}</p>

              <button
                className="absolute top-4 right-4 text-red-500 hover:text-red-400 transition"
                onClick={() => deleteHandler(podcast._id)}
              >
                <MdDelete size={24} />
              </button>

              <form onSubmit={() => addThumbnailHandler(podcast._id)}>
                <div className="space-y-2 mt-4">
                  <label className="block text-sm font-medium">
                    Change Thumbnail
                  </label>
                  <input
                    type="file"
                    className="auth-input"
                    accept="image/*"
                    onChange={(e) => setPodcastFile(e.target.files[0])}
                    required
                  />
                  <button
                    disabled={loading}
                    className="auth-btn bg-indigo-600 hover:bg-indigo-400 w-full py-2 text-white rounded-full transition"
                  >
                    {loading ? "Please Wait..." : "Upload Thumbnail"}
                  </button>
                </div>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
