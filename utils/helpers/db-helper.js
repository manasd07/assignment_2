import User from "../../models/user.model";

export const findOneUser = async(username)=>{
    const user = await User.findOne({username});
    return user;
};

export const addUserToDb = async (username, userDetails) => {
    try {
      const user = new User({
        username,
        userDetails,
      });
      await user.save();
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  };