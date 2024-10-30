import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 2,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// secured routes

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/change-password").post(verifyJWT, changeCurrentPassword);

router.route("/current-user").get(verifyJWT, getCurrentUser);

router.route("/update-user").patch(verifyJWT, updateAccountDetails);

router
  .route("/update-user-avatar")
  .patch(verifyJWT, upload.single("file"), updateUserAvatar);

router
  .route("/update-user-cover-image")
  .patch(verifyJWT, upload.single("file"), updateUserCoverImage);

router
  .route("/user-channel-detail/:username")
  .get(verifyJWT, getUserChannelProfile);

router.route("/user-watch-history").get(verifyJWT, getWatchHistory);

export default router;
