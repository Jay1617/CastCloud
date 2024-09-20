import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import uploadFile from "../middlewares/multer.js";
import { addPodcast, addThumbnail, createAlbum, deletePodcast, getAllAlbums, getAllPodcast, getAllPodcastByAlbum, getSinglePodcast } from "../controller/podcastController.js";


const router = express.Router();

router.post("/album/new", isAuth, uploadFile, createAlbum);
router.get("/album/all", isAuth, getAllAlbums);
router.post("/new", isAuth, uploadFile, addPodcast);
router.post("/:id", isAuth, uploadFile, addThumbnail);
router.get("/single/:id", isAuth, getSinglePodcast);
router.delete("/:id", isAuth, deletePodcast);
router.get("/all", isAuth,getAllPodcast);
router.get("/album/:id", isAuth, getAllPodcastByAlbum);

export default router;