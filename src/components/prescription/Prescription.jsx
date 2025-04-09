import React, { useState } from "react";
import "./prescription.css";
import Select from "react-select";
import { Button } from "@mui/material";
import axios from "axios";
import DescriptionIcon from "@mui/icons-material/Description";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Prescription = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [medicalName, setMedicalName] = useState(null);
  const [reason, setReason] = useState(null);
  const [disease, setDisease] = useState(null);
  const [morning, setMorning] = useState(0);
  const [afternoon, setAfternoon] = useState(0);
  const [night, setNight] = useState(0);
  const [dosage, setDosage] = useState(null);
  const [beforeFood, setBeforeFood] = useState(0);
  const [afterFood, setAfterFood] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const days = [
    { id: 1, day: "Sun" },
    { id: 2, day: "Mon" },
    { id: 3, day: "Tue" },
    { id: 4, day: "Wed" },
    { id: 5, day: "Thu" },
    { id: 6, day: "Frid" },
    { id: 7, day: "Sat" },
  ];

  // Handlers
  const handleDayClick = (id) => {
    setSelectedDays((prev) =>
      prev.includes(id) ? prev.filter((dayId) => dayId !== id) : [...prev, id]
    );
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleCheckboxChange = (setter, currentState) => {
    setter(currentState === 0 ? 1 : 0);
  };

  const handleRadioChange = (setter, deselectSetter) => {
    setter(1);
    deselectSetter(0);
  };

  const handleDosageChange = (selectedOption) => {
    setDosage(selectedOption.value);
  };

  const handlePrescriptionUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      if (
        !medicalName ||
        !reason ||
        !disease ||
        (!morning && !afternoon && !night) ||
        !dosage ||
        (!beforeFood && !afterFood) ||
        !selectedFile ||
        selectedDays.length === 0
      ) {
        toast.warn("Fill out all the fields", {
          className: "custom-toast",
          bodyClassName: "custom-toast-body",
          progressClassName: "custom-toast-progress",
        });
      } else {
        const formData = new FormData();
        formData.append("name", medicalName);
        formData.append("reason", reason);
        formData.append("disease", disease);
        formData.append("morning", morning);
        formData.append("afternoon", afternoon);
        formData.append("night", night);
        formData.append("dosage", dosage);
        formData.append("before_food", beforeFood);
        formData.append("after_food", afterFood);
        formData.append("selected_file", selectedFile);
        formData.append("selected_days", selectedDays);

        console.log(formData);

        const response = await axios.post(
          "http://localhost:5000/api/glycoCare/prescription/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Response:", response.data);
        if (response.status === 201) {
          console.log("Data successfully sent to the backend");
          toast.success("Prescription Created Successfuly", {
            className: "custom-toast",
            bodyClassName: "custom-toast-body",
            progressClassName: "custom-toast-progress",
            onClose: () => navigate("/"),
          });
        }
      }
    } catch (error) {
      console.error("Error sending data to the backend:", error);
      toast.warn("Error while Creating Prescription", {
        className: "custom-toast",
        bodyClassName: "custom-toast-body",
        progressClassName: "custom-toast-progress",
      });
    }
  };

  return (
    <div>
      <div className="containerPresInput">
        <div>
          <div
            style={{
              color: "#AA60C8",
              marginLeft: "10px",
              marginBottom: "20px",
              fontWeight: "500",
              fontSize: "21px",
            }}
          >
            Medication Information
          </div>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <div className="partApresc">
            {/* Medication Name */}
            <div className="inputAndDesDiv">
              <div className="formInpTit">Medication Name</div>
              <div>
                <input
                  className="input"
                  style={{ height: "40px" }}
                  type="text"
                  value={medicalName || ""}
                  onChange={handleInputChange(setMedicalName)}
                />
              </div>
            </div>
            {/* Reason for Medication */}
            <div className="inputAndDesDiv">
              <div className="formInpTit">Reason For Medication</div>
              <div>
                <textarea
                  className="input"
                  style={{ height: "120px" }}
                  value={reason || ""}
                  onChange={handleInputChange(setReason)}
                />
              </div>
            </div>
            {/* Name of Disease */}
            <div className="inputAndDesDiv">
              <div className="formInpTit">Name of Disease</div>
              <div>
                <textarea
                  className="input"
                  style={{ height: "105px" }}
                  value={disease || ""}
                  onChange={handleInputChange(setDisease)}
                />
              </div>
            </div>
            {/* Schedule Timings */}
            <div className="inputAndDesDiv">
              <div className="formInpTit">Schedule Timings</div>
              <div style={{ display: "flex", gap: "30px" }}>
                {days.map((day) => (
                  <div
                    key={day.id}
                    onClick={() => handleDayClick(day.id)}
                    style={{
                      cursor: "pointer",
                      color: selectedDays.includes(day.id) ? "white" : "rgb(92, 91, 91)",
                      border: selectedDays.includes(day.id)
                        ? "1px solid #AA60C8"
                        : "1px solid lightgray",
                      backgroundColor: selectedDays.includes(day.id)
                        ? "#AA60C8"
                        : "white",
                      fontSize: "15px",
                      borderRadius: "10px",
                      padding: "7px",
                    }}
                  >
                    {day.day}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="partBpresc">
            {/* Intake Time */}
            <div>
              <div className="formInpTit">Intake Time</div>
              <div className="checkBoxMainDiv">
                <div
                  className={morning ? "inputSubTitDivSelect" : "inputSubTitDivDeSelect"}
                  onClick={() => handleCheckboxChange(setMorning, morning)}
                >
                  Morning
                </div>
                <div
                  className={afternoon ? "inputSubTitDivSelect" : "inputSubTitDivDeSelect"}
                  onClick={() => handleCheckboxChange(setAfternoon, afternoon)}
                >
                  Afternoon
                </div>
                <div
                  className={night ? "inputSubTitDivSelect" : "inputSubTitDivDeSelect"}
                  onClick={() => handleCheckboxChange(setNight, night)}
                >
                  Night
                </div>
              </div>
            </div>
            {/* Dosage */}
            <div className="inputAndDesDiv">
              <div className="formInpTit">Dosage</div>
              <div>
                <Select
                  className="dosageDropDiv"
                  options={[
                    { value: 0.5, label: "0.5tab" },
                    { value: 1, label: "1tab" },
                    { value: 1.5, label: "1.5tab" },
                    { value: 2, label: "2tab" },
                  ]}
                  placeholder=""
                  onChange={handleDosageChange}
                />
              </div>
            </div>
            {/* Food */}
            <div>
              <div className="formInpTit">Period of Intake</div>
              <div className="checkBoxMainDiv">
                <div
                  className={beforeFood ? "inputSubTitDivSelect" : "inputSubTitDivDeSelect"}
                  onClick={() => handleRadioChange(setBeforeFood, setAfterFood)}
                >
                  Before Food
                </div>
                <div
                  className={afterFood ? "inputSubTitDivSelect" : "inputSubTitDivDeSelect"}
                  onClick={() => handleRadioChange(setAfterFood, setBeforeFood)}
                >
                  After Food
                </div>
              </div>
            </div>
            {/* Upload Prescription */}
            <div className="formInpTit">Prescription Upload</div>
            <div className="fileUploadDiv">
              {!selectedFile && (
                <label htmlFor="presc-upload" className="single-upload-button">
                  Choose File
                  <input
                    id="presc-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handlePrescriptionUpload}
                  />
                </label>
              )}
              {selectedFile && (
                <div className="filename">
                  <div style={{ display: "flex", gap: "5px" }}>
                    <DescriptionIcon /> {selectedFile.name}{" "}
                  </div>
                </div>
              )}
            </div>
            {/* Buttons */}
            <div className="btnsDivMain">
              <div>
                <button className="cancelBtn">Cancel</button>
              </div>
              <div>
                <button className="saveBtn" onClick={handleSubmit}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Prescription;
