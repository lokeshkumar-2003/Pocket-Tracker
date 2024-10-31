import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import GaugeComponent from "react-gauge-component";
import { GaugeChartService } from "../../service/MatricsService";

const GaugeChart = () => {
  const { user } = useContext(UserContext);
  const [gaugeValue, setGaugeValue] = useState(0);
  const [remainAmount, setRemainAmount] = useState(0);
  const { userId } = user;

  useEffect(() => {
    const fetchGaugeData = async () => {
      if (userId) {
        const response = await GaugeChartService(userId);
        setGaugeValue(response?.overAllSpent || 0);
        setRemainAmount(response?.remainAmount || 0);
      }
    };
    fetchGaugeData();
  }, [userId]);

  return (
    <>
      <div
        style={{
          background: "#00000034",
          padding: "20px",
          borderRadius: "10px", // Rounded corners for a smoother look
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center horizontally
          justifyContent: "center", // Center vertically
          maxWidth: "400px", // Limiting width for responsive layout
          margin: "auto", // Centering the chart container
        }}
      >
        <h3
          style={{
            color: "#ffffff",
            textAlign: "center",
            fontSize: "20px",
            marginBottom: "20px",
          }}
        >
          Overall Performance
        </h3>

        <GaugeComponent
          style={{ width: "100%", height: "auto" }} // Set a max width for responsive scaling
          value={gaugeValue && gaugeValue}
          type="radial"
          minValue={0}
          maxValue={100}
          labels={{
            tickLabels: {
              type: "inner",
              ticks: [
                { value: 0, label: "0%" },
                { value: 20, label: "20%" },
                { value: 40, label: "40%" },
                { value: 60, label: "60%" },
                { value: 80, label: "80%" },
                { value: 100, label: "100%" },
              ],
            },
            valueLabel: {
              show: true,
              fontSize: 30,
              textAnchor: "middle",
              dy: "0.3em",
              color: "#ffffff", // Centered value color
            },
          }}
          arc={{
            colorArray: ["#5BE12C", "#F5CD19", "#EA4228"],
            subArcs: [
              { limit: 20 }, // Green for 0-20%
              { limit: 50 }, // Yellow for 20-50%
              { limit: 100 }, // Red for 50-100%
            ],
            padding: 0.02, // Padding between arcs
            width: 0.3, // Arc thickness
          }}
          pointer={{
            elastic: true,
            animationDelay: 0,
            pointerWidth: 0.05, // Customize pointer width
          }}
        />
        <p
          style={{
            color: "#fff", // High contrast white text
            textAlign: "center",
            marginTop: "20px", // Increase spacing from the chart
            fontSize: "24px", // Larger font size for visibility
            fontWeight: "bold", // Bold for emphasis
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)", // Subtle text shadow for better readability
          }}
        >
          {`Pocket Money ₹${remainAmount}`}
        </p>
      </div>
    </>
  );
};

export default GaugeChart;
