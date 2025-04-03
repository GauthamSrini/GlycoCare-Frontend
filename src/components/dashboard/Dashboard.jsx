import React, { useEffect, useState } from "react";
import "./dashboard.css";
import CircleIcon from "@mui/icons-material/Circle";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

// Register the required modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [medicineData, setMedicineData] = useState([]);
  const [foodItemsData,setFoodItemsData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  useEffect(() => {
    fetchMedicineChoices();
    fetchDietaryChoices()
  }, []);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[currentDate.getDay()]; // Get the day of the week
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  // Sugar Data
  const data = {
    labels: ["Week1", "Week2", "Week3", "Week4"],
    datasets: [
      {
        label: "Sugar Level",
        data: [110,90,100,120],
        fill: false,
        borderColor: "#AA60C8",
        tension: 0.1,
      },
    ],
  };

  // Heart Rate Data
  const data1 = {
    labels: ["Week1", "Week2", "Week3", "Week4"],
    datasets: [
      {
        label: "Heart Rate",
        data: [115,100,110,80],
        fill: false,
        borderColor: "#AA60C8",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Removes vertical grid lines
        },
      },
      y: {
        grid: {
          display: false, // Removes horizontal grid lines
        },
        ticks: {
          stepSize: 50, // Sets tick intervals to multiples of 10
          callback: (value) => value.toFixed(0), // Removes decimal places
        },
      },
    },
  };

  const fetchMedicineChoices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/glycoCare/prescription/getAll"
      );
      setMedicineData(response.data);
    } catch (err) {
      console.log("error fetching the diatary choices", err);
    }
  };

  const fetchDietaryChoices = async () =>{
    try{
    const response = await axios.get('http://localhost:5000/api/glycoCare/dietaryChoices')
        setFoodItemsData(response.data)
    }
    catch(err){
        console.log("error fetching the diatary choices",err);
    }
  }

  return (
    <div className="dashMainDiv">
      <div className="titleDiv">
        <div className="titleName">Good Afternoon, Gautham!</div>
        <div className="quote">The greatest wealth is health</div>
      </div>
      <div style={{ display: "flex", marginTop: "10px", gap: "10px" }}>
        <div className="partADashMain">
          <div className="sugarLevelMainDiv">
            <div
              style={{
                padding: "20px",
                paddingBottom: "10px",
                paddingTop: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="grapthTitle">Sugar Level</div>
              <div className="IndicationTitleDiv">
                <div
                  style={{
                    fontSize: "17px",
                    color: "#AA60C8",
                    marginLeft: "10px",
                  }}
                >
                  Indication
                </div>
                <div className="plusIcon">+</div>
              </div>
            </div>
            <div
              style={{
                padding: "0px 20px 10px 20px",
                display: "flex",
                gap: "10px",
              }}
            >
              <div className="sugarGrapthDiv">
                <Line data={data} options={options} />
              </div>
              <div className="IndicationsDiv">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "15px",
                  }}
                >
                  <CircleIcon style={{ height: "17px", color: "#40DC82" }} />
                  Normal Level{" "}
                  <CircleIcon
                    style={{
                      height: "17px",
                      marginLeft: "25px",
                      color: "#FF0A00",
                    }}
                  />
                  High Level
                </div>
                <div className="staticSugarTit">Sugar Level Ranges</div>
                <div>
                  <table className="tableDatasugars">
                    <tr>
                      <th>Age</th>
                      <th>Systolic Range</th>
                      <th>Diastolic Range</th>
                    </tr>
                    <tr>
                      <td>19–40 years</td>
                      <td>95–135</td>
                      <td>60–80</td>
                    </tr>
                    <tr>
                      <td>41–60 years</td>
                      <td>110–145</td>
                      <td>70–90</td>
                    </tr>
                    <tr>
                      <td>61 and older</td>
                      <td>95–145</td>
                      <td>70–90</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="heartRateMainDiv">
            <div
              style={{
                padding: "20px",
                paddingBottom: "10px",
                paddingTop: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="grapthTitle">Heart Rate</div>
              <div className="IndicationTitleDiv">
                <div
                  style={{
                    fontSize: "17px",
                    color: "#AA60C8",
                    marginLeft: "10px",
                  }}
                >
                  Indication
                </div>
                <div className="plusIcon">+</div>
              </div>
            </div>
            <div
              style={{
                padding: "0px 20px 10px 20px",
                display: "flex",
                gap: "10px",
              }}
            >
              <div className="sugarGrapthDiv">
                <Line data={data1} options={options} />
              </div>
              <div className="IndicationsDiv">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "15px",
                  }}
                >
                  <CircleIcon style={{ height: "17px", color: "#40DC82" }} />
                  Normal Rate{" "}
                  <CircleIcon
                    style={{
                      height: "17px",
                      marginLeft: "25px",
                      color: "#FF0A00",
                    }}
                  />
                  High Rate
                </div>
                <div className="staticSugarTit">Heart Rate Ranges</div>
                <div>
                  <table className="tableDatasugars">
                    <tr>
                      <th>Age</th>
                      <th>Average Range</th>
                      <th>Maximum Range</th>
                    </tr>
                    <tr>
                      <td>45 years</td>
                      <td>88 to 149 bpm</td>
                      <td>175 bpm</td>
                    </tr>
                    <tr>
                      <td>50 years</td>
                      <td>85to 145 bpm5</td>
                      <td>170 bpm</td>
                    </tr>
                    <tr>
                      <td>55 years</td>
                      <td>83 to 140 bpm</td>
                      <td>165 bpm</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="partBDashMain">
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              maxWidth: "100%",
            }}
          >
            {/* Header */}
            <div
              style={{
                backgroundColor: "#AA60C8",
                color: "white",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <div>Today is {day}</div>
            </div>
            {/* Footer */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                backgroundColor: "#ffffff",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "5px" }}>📅</span>
                <span>{formattedDate}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "5px" }}>⏰</span>
                <span>{formattedTime}</span>
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "10px",
              borderRadius: "8px",
              overflow: "hidden",
              maxWidth: "100%",
              backgroundColor: "#ffffff",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <img src="/images/medicine.png" />
              Medicine Supplies For Today
              <div className="plusIcon" style={{cursor:"pointer"}} onClick={()=>navigate('/prescription')} >+</div>
            </div>
            <div style={{height:"24vh",overflow:"scroll"}}>
              {medicineData.length > 0 ? (
                <table className="MedicineTableMain">
                  <tr>
                    <th>Medicine</th>
                    <th>Time</th>
                    <th>Amount</th>
                  </tr>
                  {medicineData.map((row) => (
                    <tr>
                      <td>{row.medicine}</td>
                      <td>{row.time}</td>
                      <td>{row.dosage} tab</td>
                    </tr>
                  ))}
                </table>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src="/images/empty.svg" height={"180px"} style={{marginBottom:"20px"}} alt="" />
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              padding: "10px",
              borderRadius: "8px",
              overflow: "hidden",
              maxWidth: "100%",
              backgroundColor: "#ffffff",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
             <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <img src="/images/diet.png" height={"35px"}  style={{
                border:"1px solid white",
                padding:"5px",
                borderRadius:"8px",
                boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"
              }}/>
             <div>Dietary Choices For Today</div>
             <div><button style={{
              textTransform:"none",
              padding:"5px",
              border:"1px solid #AA60C8",
              borderRadius:"5px",
              backgroundColor:"#AA60C8",
              color:"white",
              cursor:"pointer"
             }}
             onClick={()=>navigate('/recommentation')}
             >View</button></div>
            </div>
            <div style={{height:"28vh",overflow:"auto"}}>
            <table className="FoodsTableMain">
              <tr>
                <th>Food</th>
                <th>Preparation</th>
                <th>Nutrient</th>
              </tr>
              {foodItemsData.map((row) => (
                <tr>
                  <td>{row.food_name}</td>
                  <td><div style={{width:"100px",height:"45px",overflow:"hidden"}}>{row.preparation}</div></td>
                  <td><div style={{width:"100px",height:"45px",overflow:"hidden"}}>{row.nutrient}</div></td>
                </tr>
              ))}
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
