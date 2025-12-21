import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`).then(() => {
      console.log("Connected To Database");
    });
  } catch (error) {
    console.error("ERROR ", error);
    process.exit(1);
  }
};

export default connectDb;
