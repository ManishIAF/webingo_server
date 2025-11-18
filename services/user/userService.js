import userModel from "../../models/user.js";
import AppError from "../../utilities/AppError.js";

const getUserById = async (id) => {
  try {

    const user = await userModel.findById(id);

    if (!user) {

      return{
        
        success: false,
        message: "User not found"
        
      }

    }

    return user;
    
  } catch (error) {

    throw new AppError(error.message || "Error while fetching user data", 500);

  }
}


const getUserByEmail = async (email, includePassword = false) => {
  try {

    let query = userModel.findOne({ email });

    if (includePassword) {
      query = query.select("+password");
    }

    const user = await query;

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return user;
  } catch (error) {
    let pureMessage = error?.errors
    ? Object.values(error.errors)[0].message
    : error.message;
    throw new AppError(pureMessage || error.message || "Error while fetching user data", 500);
  }
};


const createUser = async (name, email, password) => {
  try {

    const user = await userModel.create({
        name,
        email,
        password
    });

    return user;   

  } catch (error) {

    let pureMessage = error?.errors
    ? Object.values(error.errors)[0].message
    : error.message;

    throw new AppError(pureMessage || error.message || "Error while creating user", 500);
  }
}

const updateUser = async (email, data, options = {}) => {

  try {

    const {
        $unset, // optional unsetting fields
        ...updatableFields
      } = data;
  
    const updatePayload = {};
  
    if (Object.keys(updatableFields).length > 0) {
      updatePayload.$set = updatableFields;
    }
  
    if ($unset && typeof $unset === "object") {
      updatePayload.$unset = $unset;
    }
  
    const updatedUser = await userModel.findOneAndUpdate(
        { email },
        updatePayload,
        { new: true, runValidators: true }
      );
  
    return updatedUser;
    
  } catch (error) {

    let pureMessage = error?.errors
    ? Object.values(error.errors)[0].message
    : error.message;

    throw new AppError(pureMessage || error.message || "Error while updating user", 500);
  }


}

export { getUserById, getUserByEmail,createUser,updateUser };
