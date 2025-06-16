import { AiOutlineSave } from "react-icons/ai";
import { HiOutlineSave } from "react-icons/hi";
import {
  ImageUpload,
  InputWithLabel,
  Sidebar,
  SimpleInput,
  WhiteButton,
} from "../components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../api_config";


const EditUser = () => {
    const { id } = useParams(); // Get the user ID from the URL parameters
    
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profile_img: null, // Assuming this is the field for user image
    addresses: []
  });

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/admin_userdetails/${id}`);
        console.log("User data fetched successfully:", response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

    const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("is_superuser", userData.is_superuser);
    formData.append("is_admin", userData.is_admin);
    formData.append("is_active", userData.is_active);

    // Only append image if a new one is selected
    if (userData.user_image) {
        formData.append("profile_img", userData.user_image);
    }

    try {
        const response = await axios.patch(
        `${API_BASE_URL}/edit_user/${id}/`,
        formData,
        {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        }
        );
        console.log(response.data);
        alert("User updated successfully!");
        navigate('/users')
        
    } catch (error) {
        console.error("Error updating user:", error.response?.data || error);
        alert("Failed to update user.");
    }
    };

  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
          <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Edit user
              </h2>
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
              <button className="dark:bg-blackPrimary border border-gray-600 w-48 py-2 text-lg dark:hover:border-gray-500 hover:border-gray-400 duration-200 flex items-center justify-center gap-x-2">
                <AiOutlineSave className="dark:text-whiteSecondary text-blackPrimary text-xl" />
                <span className="dark:text-whiteSecondary text-blackPrimary font-medium">
                  Save draft
                </span>
              </button>
              <WhiteButton
                textSize="lg"
                width="48"
                py="2"
                text="Update user"
                onClick={handleSubmit}
              >
                <HiOutlineSave className="dark:text-blackPrimary text-whiteSecondary text-xl" />
              </WhiteButton>
            </div>
          </div>

          {/* Add Product section here  */}
          <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-8 grid grid-cols-2 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10">
            {/* left div */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                User information
              </h3>

              <div className="mt-4 flex flex-col gap-5">
                <InputWithLabel label="First Name">
                  <SimpleInput
                    type="text"
                    placeholder="Enter a first name..."
                    value={userData.first_name}
                    onChange={(e) =>
                      setUserData({ ...userData, first_name: e.target.value })
                    }
                    readOnly
                  />
                </InputWithLabel>

                <InputWithLabel label="Last Name">
                  <SimpleInput
                    type="text"
                    placeholder="Enter a last name..."
                    value={userData.last_name}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        last_name: e.target.value,
                      })
                    }
                    readOnly
                  />
                </InputWithLabel>

                <InputWithLabel label="Email">
                  <SimpleInput
                    type="text"
                    placeholder="Enter a email ..."
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    readOnly
                  />
                </InputWithLabel>

                {/* <InputWithLabel label="Password">
                  <SimpleInput
                    type="password"
                    placeholder="Enter a password..."
                    value={inputObject.password}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        password: e.target.value,
                      })
                    }
                  />
                </InputWithLabel> */}

                {/* <InputWithLabel label="Confirm password">
                  <SimpleInput
                    type="password"
                    placeholder="Enter a confirm password..."
                    value={inputObject.confirmPassword}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </InputWithLabel> */}

                {/* <InputWithLabel label="Select role">
                  <SelectInput
                    selectList={roles}
                    value={inputObject.role}
                    onChange={(e) =>
                      setInputObject({ ...inputObject, role: e.target.value })
                    }
                  />
                </InputWithLabel> */}
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                    Permissions
                </h3>
                <div className="mt-4 flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-lg dark:text-whiteSecondary text-blackPrimary">
                        <input
                            type="checkbox"
                            checked={userData.is_superuser}
                            onChange={(e) =>
                            setUserData({ ...userData, is_superuser: e.target.checked })
                            }
                        />
                        <span>Is Superuser</span>
                        </div>

                    <div className="flex items-center gap-3 text-lg dark:text-whiteSecondary text-blackPrimary">
                    <input
                        type="checkbox"
                        checked={userData.is_admin}
                        onChange={(e) =>
                        setUserData({ ...userData, is_admin: e.target.checked })
                        }
                    />
                    Is Admin
                    </div>

                    <div className="flex items-center gap-3 text-lg dark:text-whiteSecondary text-blackPrimary">
                    <input
                        type="checkbox"
                        checked={userData.is_active}
                        onChange={(e) =>
                        setUserData({ ...userData, is_active: e.target.checked })
                        }
                    />
                    Is Active
                    </div>
                </div>
                </div>

                <div className="mt-8">
            <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Address Information
            </h3>
            <div className="mt-4 flex flex-col gap-5">
                {userData.addresses?.length > 0 ? (
                <>
                    <InputWithLabel label="Street Address">
                    <SimpleInput
                        type="text"
                        value={userData.addresses[0]?.street_address || ""}
                        readOnly
                    />
                    </InputWithLabel>

                    <InputWithLabel label="City">
                    <SimpleInput
                        type="text"
                        value={userData.addresses[0]?.city || ""}
                        readOnly
                    />
                    </InputWithLabel>

                    <InputWithLabel label="Zipcode">
                    <SimpleInput
                        type="text"
                        value={userData.addresses[0]?.zipcode || ""}
                        readOnly
                    />
                    </InputWithLabel>

                    <InputWithLabel label="Country">
                    <SimpleInput
                        type="text"
                        value={userData.addresses[0]?.country || ""}
                        readOnly
                    />
                    </InputWithLabel>

                    <InputWithLabel label="Phone Number">
                    <SimpleInput
                        type="text"
                        value={userData.addresses[0]?.phone_number || ""}
                        readOnly
                    />
                    </InputWithLabel>
                </>
                ) : (
                <p className="text-gray-500 text-sm">No address found.</p>
                )}
            </div>
            </div>
            </div>

            {/* right div */}
            <div>
              {/* <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Upload user image
              </h3>
               <ImageUpload
                onImageSelect={(file) => {
                    setUserData({ ...userData, user_image: file }); // Update actual image data
                    setSelectedImage(URL.createObjectURL(file)); // Preview URL
                }}
                /> */}

                {!userData.is_admin &&

                <div className="flex justify-center gap-x-2 mt-5 flex-wrap">
                    <img
                    src={userData.profile_img}
                    alt="Existing"
                    className="w-56 h-56 object-cover rounded border"
                    />
                </div>
                
                }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditUser;
