import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    guest: {
      type: String,
      required: true,
    },
    thumbnail: {
      id: String,
      url: String,
    },
    audio: {
      id: String,
      url: String,
    },
    album: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Podcast = mongoose.model("Podcast", schema);
