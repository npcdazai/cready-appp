import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import SidebarModal from "../components/SidebarModal";
import { API_CONFIG } from "../config/api";
import { logout, updateUser } from "../store/slices/authSlice";
import apiClient from "../utils/apiClient";
import { SafeAreaView } from "react-native-safe-area-context";

function formatINR(num: number) {
  return num.toLocaleString("en-IN");
}

const JOB_TYPES = ["Salaried", "Self-Employed", "Business Owner", "Other"];
const GENDER_OPTIONS = ["Male", "Female"];
const MINIMUM_SALARY = 20000;

export default function Profile() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [showJobDropdown, setShowJobDropdown] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  // Editable fields state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<string | null>(null);
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [pincode, setPincode] = useState("");

  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  // Initialize form data when user data is available
  React.useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setDob(user.dateOfBirth ? formatDateForDisplay(user.dateOfBirth) : "");
      setGender(user.gender || null);
      setJobType(user.jobType || "");
      setSalary(user.monthlySalary ? user.monthlySalary.toString() : "");
      setLoanAmount(user.loanAmount ? user.loanAmount.toString() : "");
      setPincode(user.pincode ? user.pincode.toString() : "");
    }
  }, [user]);

  const formatPhone = (phone: string) => {
    if (!phone) return "Not provided";
    return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
  };

  const formatSalary = (salary: number) => {
    if (!salary) return "Not provided";
    return `₹${salary.toLocaleString("en-IN")}`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not provided";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).replace(/\//g, " / ");
  };

  const getFullName = () => {
    if (!user) return "Loading...";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    const fullName = `${firstName} ${lastName}`.trim();
    return fullName || user.fullName || "Not provided";
  };

  const getPhoneNumber = () => {
    if (!user) return "Not provided";
    return user.mobileNumber || user.phone || "Not provided";
  };

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Name validation function - only letters, spaces, and common name characters
  const isValidName = (name: string) => {
    const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
    return nameRegex.test(name);
  };

  // Validation function
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // First Name validation
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!isValidName(firstName.trim())) {
      newErrors.firstName = "First name should only contain letters";
    } else if (firstName.trim().length < 2) {
      newErrors.firstName = "First name should be at least 2 characters";
    }

    // Last Name validation
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!isValidName(lastName.trim())) {
      newErrors.lastName = "Last name should only contain letters";
    } else if (lastName.trim().length < 2) {
      newErrors.lastName = "Last name should be at least 2 characters";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // Gender validation
    if (!gender) {
      newErrors.gender = "Please select your gender";
    }

    // Job Type validation
    if (!jobType) {
      newErrors.jobType = "Please select your job type";
    }

    // Salary validation
    if (!salary.trim()) {
      newErrors.salary = "Monthly salary is required";
    } else if (Number(salary.replace(/[^0-9]/g, "")) < MINIMUM_SALARY) {
      newErrors.salary = `Minimum monthly salary must be at least ₹${formatINR(MINIMUM_SALARY)}`;
    }

    // Loan Amount validation
    if (!loanAmount.trim()) {
      newErrors.loanAmount = "Loan amount is required";
    } else if (Number(loanAmount.replace(/[^0-9]/g, "")) < 10000) {
      newErrors.loanAmount = "Minimum loan amount must be at least ₹10,000";
    }

    // Pincode validation
    if (!pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (pincode.length !== 6) {
      newErrors.pincode = "Pincode should be 6 digits";
    } else if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincode = "Pincode should contain only numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.updateUserProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        gender: gender!,
        jobType,
        monthlySalary: Number(salary.replace(/[^0-9]/g, "")),
        loanAmount: Number(loanAmount.replace(/[^0-9]/g, "")),
        pincode: pincode.trim(),
      });
      if (response.data) {
        dispatch(updateUser(response.data));
        setIsEditing(false);
        Alert.alert("Success", "Profile updated successfully!");
      } else {
        Alert.alert("Error", response.message || "Failed to update profile");
      }
    } catch (error) {
      Alert.alert("Error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original values
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setDob(user.dateOfBirth ? formatDateForDisplay(user.dateOfBirth) : "");
      setGender(user.gender || null);
      setJobType(user.jobType || "");
      setSalary(user.monthlySalary ? user.monthlySalary.toString() : "");
      setLoanAmount(user.loanAmount ? user.loanAmount.toString() : "");
      setPincode(user.pincode ? user.pincode.toString() : "");
    }
    setErrors({});
    setIsEditing(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    const formattedDate = date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, " / ");
    setDob(formattedDate);
    hideDatePicker();
  };

  const pickImage = async () => {
    try {
      // Request permissions
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Please grant camera roll permissions to update your profile picture."
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await uploadProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  const uploadProfileImage = async (imageUri: string) => {
    setUploadingImage(true);
    try {
      const response = await apiClient.updateProfileImage(imageUri);
      if (response.success && response.data) {
        dispatch(updateUser(response.data));
        Alert.alert("Success", "Profile image updated successfully!");
      } else {
        Alert.alert(
          "Error",
          response.message || "Failed to update profile image"
        );
      }
    } catch (error) {
      Alert.alert("Error", "Network error. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFirstNameChange = (text: string) => {
    setFirstName(text);
    if (errors.firstName) {
      setErrors(prev => ({ ...prev, firstName: "" }));
    }
  };

  const handleLastNameChange = (text: string) => {
    setLastName(text);
    if (errors.lastName) {
      setErrors(prev => ({ ...prev, lastName: "" }));
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: "" }));
    }
  };

  const handleGenderChange = (selectedGender: string) => {
    setGender(selectedGender);
    if (errors.gender) {
      setErrors(prev => ({ ...prev, gender: "" }));
    }
  };

  const handleJobTypeChange = (selectedJobType: string) => {
    setJobType(selectedJobType);
    if (errors.jobType) {
      setErrors(prev => ({ ...prev, jobType: "" }));
    }
  };

  const handleSalaryChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    setSalary(numericText);
    if (errors.salary) {
      setErrors(prev => ({ ...prev, salary: "" }));
    }
  };

  const handleLoanAmountChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    setLoanAmount(numericText);
    if (errors.loanAmount) {
      setErrors(prev => ({ ...prev, loanAmount: "" }));
    }
  };

  const handlePincodeChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    setPincode(numericText);
    if (errors.pincode) {
      setErrors(prev => ({ ...prev, pincode: "" }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SidebarModal
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => setSidebarVisible(true)}
          >
            <Image source={require("../../assets/images/menuIcon.png")} />
          </TouchableOpacity>
          <View>
            <Image source={require("../../assets/images/headerText.png")} />
            <Text style={styles.welcomeText}>Get credit. Get going.</Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={true}
          >
            <View style={{ alignItems: "center" }}>
              <Image source={require("../../assets/images/profileCoverbg.png")} />
            </View>
            <View style={{ paddingHorizontal: 25 }}>
              {/* Profile Section */}
              <View style={styles.profileSection}>
                <View style={styles.profileImageContainer}>
                  {user?.profileImage ? (
                    <Image
                      source={{ uri: API_CONFIG.BASE_URL + user.profileImage }}
                      style={styles.profileImage}
                    />
                  ) : (
                    <Ionicons name="person-circle" size={120} color="black" />
                  )}
                  <TouchableOpacity
                    style={styles.editImageButton}
                    onPress={pickImage}
                    disabled={uploadingImage}
                  >
                    <Ionicons name="camera" size={20} color="white" />
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.profileName}>{getFullName()}</Text>
                  <Text style={styles.profileEmail}>
                    {user?.email || "Loading..."}
                  </Text>
                </View>
              </View>

              {/* Edit/Save Buttons */}
              <View style={styles.buttonRow}>
                {!isEditing ? (
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => setIsEditing(true)}
                  >
                    <Text style={styles.editBtnText}>Edit Profile</Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.cancelBtn}
                      onPress={handleCancel}
                      disabled={loading}
                    >
                      <Text style={styles.cancelBtnText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.saveBtn, loading && styles.saveBtnDisabled]}
                      onPress={handleSave}
                      disabled={loading}
                    >
                      {loading ? (
                        <View style={styles.loadingContainer}>
                          <ActivityIndicator size="small" color="#fff" />
                          <Text style={styles.saveBtnText}>Saving...</Text>
                        </View>
                      ) : (
                        <Text style={styles.saveBtnText}>Save</Text>
                      )}
                    </TouchableOpacity>
                  </>
                )}
              </View>

              {/* Personal Information */}
              <Text style={styles.sectionTitle}>Personal information</Text>
              
              {/* Name Fields */}
              <View style={{ flexDirection: "row", gap: 12 }}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>First Name</Text>
                  <TextInput
                    style={[styles.input, errors.firstName && styles.inputError]}
                    value={firstName}
                    onChangeText={handleFirstNameChange}
                    placeholder="First Name"
                    placeholderTextColor="#bdbdbd"
                    editable={isEditing}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                  {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
                </View>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>Last Name</Text>
                  <TextInput
                    style={[styles.input, errors.lastName && styles.inputError]}
                    value={lastName}
                    onChangeText={handleLastNameChange}
                    placeholder="Last Name"
                    placeholderTextColor="#bdbdbd"
                    editable={isEditing}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                  {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email address</Text>
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  value={email}
                  onChangeText={handleEmailChange}
                  placeholder="Email"
                  placeholderTextColor="#bdbdbd"
                  editable={isEditing}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Mobile Number</Text>
                <TextInput
                  style={styles.input}
                  value={
                    getPhoneNumber()
                      ? formatPhone(getPhoneNumber())
                      : "Not provided"
                  }
                  editable={false}
                />
              </View>

              <View style={{ flexDirection: "row", gap: 12 }}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>Date Of Birth</Text>
                  <TouchableOpacity onPress={showDatePicker} disabled={!isEditing}>
                    <TextInput
                      style={styles.input}
                      value={dob}
                      editable={false}
                      placeholder="DD / MM / YYYY"
                      placeholderTextColor="#bdbdbd"
                    />
                  </TouchableOpacity>
                </View>
                                 <View style={[styles.inputGroup, { flex: 1 }]}>
                   <Text style={styles.inputLabel}>Gender</Text>
                   {isEditing ? (
                     <>
                       <TouchableOpacity
                         style={[styles.input, errors.gender && styles.inputError]}
                         onPress={() => setShowGenderDropdown(!showGenderDropdown)}
                         activeOpacity={0.8}
                       >
                         <Text
                           style={{
                             color: gender ? "#222" : "#bdbdbd",
                             fontSize: 16,
                             fontFamily: "DMSans-Regular",
                             fontWeight: "500",
                           }}
                         >
                           {gender || "Select"}
                         </Text>
                       </TouchableOpacity>
                       {showGenderDropdown && (
                         <View style={styles.dropdown}>
                           {GENDER_OPTIONS.map((option) => (
                             <TouchableOpacity
                               key={option}
                               style={styles.dropdownItem}
                               onPress={() => {
                                 handleGenderChange(option);
                                 setShowGenderDropdown(false);
                               }}
                             >
                               <Text style={styles.dropdownItemText}>{option}</Text>
                             </TouchableOpacity>
                           ))}
                         </View>
                       )}
                     </>
                   ) : (
                     <TextInput
                       style={styles.input}
                       value={gender || "Not provided"}
                       editable={false}
                     />
                   )}
                   {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
                 </View>
              </View>

              {/* Financial Information */}
              <Text style={styles.sectionTitle}>Financial Information</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Profession</Text>
                {isEditing ? (
                  <>
                    <TouchableOpacity
                      style={[styles.input, errors.jobType && styles.inputError]}
                      onPress={() => setShowJobDropdown(!showJobDropdown)}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={{
                          color: jobType ? "#222" : "#bdbdbd",
                          fontSize: 16,
                          fontFamily: "DMSans-Regular",
                          fontWeight: "500",
                        }}
                      >
                        {jobType || "Select"}
                      </Text>
                    </TouchableOpacity>
                    {showJobDropdown && (
                      <View style={styles.dropdown}>
                        {JOB_TYPES.map((type) => (
                          <TouchableOpacity
                            key={type}
                            style={styles.dropdownItem}
                            onPress={() => {
                              handleJobTypeChange(type);
                              setShowJobDropdown(false);
                            }}
                          >
                            <Text style={styles.dropdownItemText}>{type}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </>
                ) : (
                  <TextInput
                    style={styles.input}
                    value={jobType || "Not provided"}
                    editable={false}
                  />
                )}
                {errors.jobType && <Text style={styles.errorText}>{errors.jobType}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Monthly in–Hand Salary</Text>
                {isEditing ? (
                  <View style={[styles.inputWrapper, errors.salary && styles.inputError]}>
                    <Text style={styles.rupeeSymbol}>₹</Text>
                    <TextInput
                      style={styles.amountInput}
                      value={salary ? formatINR(Number(salary)) : ""}
                      onChangeText={handleSalaryChange}
                      placeholder="45,000"
                      placeholderTextColor="#bdbdbd"
                      keyboardType="number-pad"
                      maxLength={9}
                    />
                  </View>
                ) : (
                  <TextInput
                    style={styles.input}
                    value={
                      user?.monthlySalary
                        ? formatSalary(user.monthlySalary)
                        : "Not provided"
                    }
                    editable={false}
                  />
                )}
                {errors.salary && <Text style={styles.errorText}>{errors.salary}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>PAN Card Number</Text>
                <TextInput
                  style={styles.input}
                  value={user?.panNumber || "Not provided"}
                  editable={false}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Loan Amount</Text>
                {isEditing ? (
                  <View style={[styles.inputWrapper, errors.loanAmount && styles.inputError]}>
                    <Text style={styles.rupeeSymbol}>₹</Text>
                    <TextInput
                      style={styles.amountInput}
                      value={loanAmount ? formatINR(Number(loanAmount)) : ""}
                      onChangeText={handleLoanAmountChange}
                      placeholder="1,00,000"
                      placeholderTextColor="#bdbdbd"
                      keyboardType="number-pad"
                      maxLength={9}
                    />
                  </View>
                ) : (
                  <TextInput
                    style={styles.input}
                    value={
                      user?.loanAmount
                        ? `₹${user.loanAmount.toLocaleString("en-IN")}`
                        : "Not provided"
                    }
                    editable={false}
                  />
                )}
                {errors.loanAmount && <Text style={styles.errorText}>{errors.loanAmount}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Pincode</Text>
                <TextInput
                  style={[styles.input, errors.pincode && styles.inputError]}
                  value={pincode}
                  onChangeText={handlePincodeChange}
                  placeholder="Pincode"
                  placeholderTextColor="#bdbdbd"
                  editable={isEditing}
                  keyboardType="number-pad"
                  maxLength={6}
                />
                {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}
              </View>

              {/* Logout Button */}
              <View style={styles.logoutSection}>
                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={handleLogout}
                >
                  <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate())}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 150,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  menuIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "DMSans-Regular",
  },
  logo: {
    width: 120,
    height: 32,
    resizeMode: "contain",
  },
  bellIcon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    bottom: 23,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginRight: 16,
    backgroundColor: "#eee",
    borderWidth: 5,
    borderColor: "white",
    marginLeft: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
    fontFamily: "DMSans-bold",
  },
  profileEmail: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
    fontFamily: "DMSans-regular",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
    marginTop: 8,
  },
  editBtn: {
    flex: 1,
    backgroundColor: "rgba(89, 57, 190, 1)",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  editBtnText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "DMSans-SemiBold",
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "rgba(247, 247, 247, 1)",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(225, 225, 225, 1)",
  },
  cancelBtnText: {
    color: "#222",
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "DMSans-SemiBold",
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "rgba(89, 57, 190, 1)",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveBtnDisabled: {
    backgroundColor: "#9e9e9e",
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "DMSans-SemiBold",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(118, 118, 118, 1)",
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 1)",
    marginBottom: 4,
    fontFamily: "DMSans-regular",
    fontWeight: "400",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "rgba(0, 0, 0, 1)",
    borderWidth: 1,
    borderColor: "#ececec",
    fontFamily: "DMSans-regular",
    fontWeight: "500",
  },
  inputError: {
    borderColor: "#ff4444",
    borderWidth: 1,
  },
     errorText: {
     color: "#ff4444",
     fontSize: 12,
     fontFamily: "DMSans-Regular",
     marginBottom: 8,
     marginTop: -2,
   },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 2,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdownItemText: {
    color: "#222",
    fontSize: 16,
    fontFamily: "DMSans-Regular",
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    height: 50,
    marginBottom: 5,
  },
  rupeeSymbol: {
    fontSize: 16,
    color: "#222",
    marginRight: 10,
    fontFamily: "DMSans-Regular",
    fontWeight: "500",
  },
  amountInput: {
    flex: 1,
    fontSize: 16,
    color: "#222",
    backgroundColor: "transparent",
    padding: 0,
    fontFamily: "DMSans-Regular",
    fontWeight: "500",
  },
  logoutSection: {
    marginTop: 30,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#ff4444",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ff4444",
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "DMSans-SemiBold",
  },
  profileImageContainer: {
    position: "relative",
  },
  editImageButton: {
    position: "absolute",
    bottom: 2,
    right: 10,
    backgroundColor: "rgba(98, 50, 255, 1)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  editImageButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "DMSans-SemiBold",
  },
});
