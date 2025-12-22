import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponce } from "../utils/ApiResponce.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;
  console.log(email);
  if (
    [fullName, email, password, username].some((feild) => feild?.trim() === "")
  ) {
    throw new ApiError(400, "All feild required");
  }

  const existedUser = User.findOne({ $or: [{ email }, { username }] });
  if (existedUser) {
    throw new ApiError(409, "User with username or email already exist");
  }

  console.log(req.files);
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverimage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar File Is Needed");
  }
  const uploadedAvatar = await uploadOnCloudinary(avatarLocalPath);
  const uploadedCoverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!uploadedAvatar) {
    throw new ApiError(400, "Avatar File Is Needed");
  }

  const user = await User.create({
    fullName,
    avatar: uploadedAvatar.url,
    coverimage: uploadedCoverImage?.url || "",
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while saving the user");
  }

  return res
    .status(201)
    .json(new ApiResponce(200, createdUser, "User Registered Successfully"));
});

export { registerUser };
