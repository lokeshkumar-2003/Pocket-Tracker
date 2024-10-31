import axiosInstance from "../axiosConfig/Axios.js";

const addProfileService = async (userId, profileData) => {
  try {
    console.log(profileData);
    // Send the POST request with formData
    const response = await axiosInstance.post(
      `profile/${userId}`,
      profileData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return {
      message: error?.response?.data?.message || "Failed to add profile",
      success: false,
    };
  }
};

// Get Profile Service
const getProfileService = async (userId) => {
  try {
    const response = await axiosInstance.get(`profile/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return {
      message: error?.response?.data?.message || "Failed to fetch profile",
      success: false,
    };
  }
};

// Update Profile Service
const updateProfileService = async (userId, profileData) => {
  try {
    console.log(profileData, 1);
    const response = await axiosInstance.put(`profile/${userId}`, profileData, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return {
      message: error?.response?.data?.message || "Failed to update profile",
      success: false,
    };
  }
};

export { addProfileService, getProfileService, updateProfileService };
