import { Album } from "../models/Album.js";
import { Podcast } from "../models/Podcast.js";
import TryCatch from "../utils/TryCatch.js";
import getDataurl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";

export const createAlbum = TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({
      message: "You are not admin",
    });

  const { title, description } = req.body;

  const file = req.file;

  const fileUrl = getDataurl(file);

  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

  await Album.create({
    title,
    description,
    thumbnail: {
      id: cloud.public_id,
      url: cloud.secure_url,
    },
  });

  res.json({
    message: "Album Added",
  });
});

export const getAllAlbums = TryCatch(async (req, res) => {
  const albums = await Album.find();

  res.json(albums);
});

export const addPodcast = TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({
      message: "You are not admin",
    });

  const { title, description, singer, album } = req.body;

  const file = req.file;

  const fileUrl = getDataurl(file);

  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content, {
    resource_type: "video",
  });

  await Podcast.create({
    title,
    description,
    guest,
    audio: {
      id: cloud.public_id,
      url: cloud.secure_url,
    },
    album,
  });

  res.json({
    message: "Podcast Added...",
  });
});

export const addThumbnail = TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({
      message: "You are not admin",
    });

  const file = req.file;

  const fileUrl = getDataurl(file);

  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

  await Podcast.findByIdAndUpdate(
    req.params.id,
    {
      thumbnail: {
        id: cloud.public_id,
        url: cloud.secure_url,
      },
    },
    { new: true }
  );

  res.json({
    message: "Thumbnail Added...",
  });
});

export const getAllPodcast = TryCatch(async (req, res) => {
  const podcast = await Podcast.find();

  res.json(podcast);
});

export const getAllPodcastByAlbum = TryCatch(async (req, res) => {
  const album = await Album.findById(req.params.id);
  const podcast = await Podcast.find({ album: req.params.id });

  res.json({ album, podcast });
});

export const deletePodcast = TryCatch(async (req, res) => {
  const podcast = await Podcast.findById(req.params.id);

  await podcast.deleteOne();

  res.json({ message: "Podcast Deleted..." });
});

export const getSinglePodcast = TryCatch(async (req, res) => {
  const podcast = await Podcast.findById(req.params.id);

  res.json(podcast);
});
