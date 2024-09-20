import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';

const PodcastContext = createContext();

const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  

export const PodcastProvider = ({ children }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [podcastLoading, setPodcastLoading] = useState(true);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [albumPodcast, setAlbumPodcast] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [index, setIndex] = useState(0);

  async function fetchPodcast() {
    try {
      const { data } = await axios.get("http://localhost:5000/api/podcast/all", config);
      setPodcasts(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchSinglePodcast() {
    if (selectedPodcast) {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/podcast/single/${selectedPodcast}`, config);
        setPodcast(data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function addAlbum(formData, setTitle, setDescription, setFile) {
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/podcast/album/new", formData, config);
      toast.success(data.message);
      fetchAlbums();
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  async function addPodcast(formData, setTitle, setDescription, setFile, setGuest, setAlbum) {
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/podcast/new", formData, config);
      toast.success(data.message);
      fetchPodcast();
      setTitle("");
      setDescription("");
      setFile(null);
      setGuest("");
      setAlbum("");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  async function addThumbnail(id, formData, setFile) {
    setLoading(true);
    try {
      const { data } = await axios.post(`http://localhost:5000/api/podcast/${id}`, formData, config);
      toast.success(data.message);
      fetchPodcast();
      setFile(null);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  async function deletePodcast(id) {
    try {
      const { data } = await axios.delete(`http://localhost:5000/api/podcast/${id}`, config);
      toast.success(data.message);
      fetchPodcast();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function fetchAlbums() {
    try {
      const { data } = await axios.get("http://localhost:5000/api/podcast/album/all", config);
      setAlbums(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchAlbumPodcast(id) {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/podcast/album/${id}`, config);
      setAlbumPodcast(data.podcasts);
      setAlbumData(data.album);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchPodcast();
      await fetchAlbums();
    };
    fetchData();
  }, []);

  function nextPodcast() {
    if (index === podcasts.length - 1) {
      setIndex(0);
      setSelectedPodcast(podcasts[0]._id);
    } else {
      setIndex(index + 1);
      setSelectedPodcast(podcasts[index + 1]._id);
    }
  }

  function prevPodcast() {
    if (index > 0) {
      setIndex(index - 1);
      setSelectedPodcast(podcasts[index - 1]._id);
    }
  }

  return (
    <PodcastContext.Provider value={{ 
      podcasts, 
      albums, 
      addAlbum, 
      addPodcast, 
      addThumbnail, 
      deletePodcast, 
      fetchAlbumPodcast, 
      loading, 
      podcastLoading, 
      isPlaying, 
      selectedPodcast, 
      setSelectedPodcast,
      nextPodcast,
      prevPodcast,
      albumPodcast,
      albumData
    }}>
      {children}
    </PodcastContext.Provider>
  );
};

export const PodcastData = () => useContext(PodcastContext);
