import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import InputText from "../../../components/Input/InputText";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import { showNotification } from "../../common/headerSlice";

const generateRandomId = () => {
  return Math.floor(Math.random() * 1000000); // Adjust range as needed
};

function ProfileSettings() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: null,
    email: "",
    title: "",
    place: "",
    about: "",
    language: "",
    timezone: "",
    //userId: "",
    name: "",
    gender: "",
    image: ""
  });

  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false); // New state to track if the user is new
  const token = localStorage.getItem("token");

  // Fetch user info on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        console.log("Fetching user info...");
        const response = await fetch("https://ihsan-backend-smoky.vercel.app/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const data = await response.json();
        console.log("User Data fetched:", data);

        if (data.length > 0) {
          const userData = data[0]; // Access the first object of the array
          setFormData({
            id: userData.id,
           // userId: userData.userId,
            name: userData.name,
            email: userData.email,
            title: userData.title,
            place: userData.place,
            about: userData.about,
            language: userData.language,
            timezone: userData.timezone,
            image: userData.image,
            gender: userData.gender,
          });
          console.log("Updated formData with fetched data:", userData);
          setIsFirstTimeUser(false); // User has data, not first-time
        } else {
          // Initialize with default values and a random ID for first-time users
          const initialData = {
            id: generateRandomId(),
            email: "",
            title: "",
            place: "",
            about: "",
            language: "",
            timezone: "",
           // userId: "", // You can use any other unique identifier logic if needed
            name: "",
            gender: "",
            image: ""
          };
          setFormData(initialData);
          console.log("Initialized formData for first-time user:", initialData);
          setIsFirstTimeUser(true); // This is a first-time user
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo(); // Call the fetch function
  }, [token]); // Run only once on mount and when token changes

  // Use useEffect to observe formData updates
  useEffect(() => {
    console.log("Form data updated:", formData);
  }, [formData]); // Log formData whenever it changes

  // Update form state based on input changes
  const updateFormValue = ({ updateType, value }) => {
    setFormData((prevData) => ({
      ...prevData,
      [updateType]: value, // Update state with the new value
    }));
  };

  // Handle form submission to update or create user info
  const updateProfile = async () => {
    const { id } = formData;
    try {
      const method = isFirstTimeUser ? "POST" : "PUT"; // Determine if we need to create or update
      const endpoint = isFirstTimeUser
        ? "https://ihsan-backend-smoky.vercel.app/user" // API endpoint to create user
        : `https://ihsan-backend-smoky.vercel.app/user/${id}`; // API endpoint to update user
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update or create profile");
      }

      const updatedData = await response.json();
      setFormData(updatedData);
      setIsFirstTimeUser(false); // After creation, the user is no longer a first-timer
      dispatch(showNotification({ message: "Profile Updated", status: 1 }));
    } catch (error) {
      console.error("Error updating or creating profile:", error);
      dispatch(showNotification({ message: "Profile Update Failed", status: 0 }));
    }
  };

  return (
    <>
      <TitleCard title="Profile Settings" topMargin="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText
            labelTitle="Name"
            value={formData.name}
            updateFormValue={updateFormValue}
            updateType="name"
          />
          <InputText
            labelTitle="Email Id"
            value={formData.email}
            updateFormValue={updateFormValue}
            updateType="email"
          />
          <InputText
            labelTitle="Title"
            value={formData.title}
            updateFormValue={updateFormValue}
            updateType="title"
          />
          <InputText
            labelTitle="Place"
            value={formData.place}
            updateFormValue={updateFormValue}
            updateType="place"
          />
          <InputText
            labelTitle="About"
            value={formData.about}
            updateFormValue={updateFormValue}
            updateType="about"
          />
        </div>

        <div className="divider"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText
            labelTitle="Language"
            value={formData.language}
            updateFormValue={updateFormValue}
            updateType="language"
          />
          <InputText
            labelTitle="Timezone"
            value={formData.timezone}
            updateFormValue={updateFormValue}
            updateType="timezone"
          />
          <InputText
            labelTitle="Image URL"
            value={formData.image}
            updateFormValue={updateFormValue}
            updateType="image"
          />
          <InputText
            labelTitle="Gender"
            value={formData.gender}
            updateFormValue={updateFormValue}
            updateType="gender"
          />
        </div>

        <div className="mt-16">
          <button className="btn btn-primary float-right" onClick={updateProfile}>
            {isFirstTimeUser ? "Create Profile" : "Update Profile"}
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default ProfileSettings;
