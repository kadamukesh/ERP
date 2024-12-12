import React, { useState, useEffect } from "react";
import axios from "axios";
import Ssidebar from "./Ssidebar";
import Stopbar from "./Stopbar";

const PayFee = () => {
  const [student, setStudent] = useState(null);
  const [feeAmount, setFeeAmount] = useState("");
  const [feeType, setFeeType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = () => {
      try {
        const studentData = {
          username: localStorage.getItem("studentUsername"),
          name: localStorage.getItem("name"),
          gender: localStorage.getItem("sgender"),
          image: localStorage.getItem("studentImage"),
          dept: localStorage.getItem("dept"),
          age: localStorage.getItem("age"),
          email: localStorage.getItem("email"),
          contact: localStorage.getItem("contact"),
          dob: localStorage.getItem("dob"),
          atype: localStorage.getItem("atype"),
          uid: localStorage.getItem("uid"),
          id: localStorage.getItem("sid"), // Assuming 'sid' maps to student ID
        };

        // Check for completeness of critical fields
        if (studentData.username && studentData.email && studentData.uid) {
          setStudent(studentData);
        } else {
          setError("Student details are incomplete.");
        }
      } catch (err) {
        setError("Error fetching student details.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  const handlePayment = () => {
    if (!feeAmount || parseFloat(feeAmount) <= 0) {
      alert("Please enter a valid Fee Amount greater than 0.");
      return;
    }

    if (!feeType) {
      alert("Please select a Fee Type.");
      return;
    }

    // Check if Razorpay is loaded
    if (!window.Razorpay) {
      alert("Razorpay SDK is not loaded. Please check your script inclusion.");
      return;
    }

    const options = {
      key: "rzp_test_Uhtl0BJG22vFeZ", // Replace with your Razorpay test key
      amount: parseFloat(feeAmount) * 100, // Convert to paise
      currency: "INR",
      name: "Acme Corp",
      description: `Fee Payment - ${feeType}`,
      image: "https://example.com/logo.png", // Optional company logo
      handler: async function (response) {
        const paymentDetails = {
          studentId: student.id,
          feeType: feeType,
          amount: parseFloat(feeAmount),
          transactionId: response.razorpay_payment_id,
          paymentStatus: "Success",
        };

        try {
          const apiResponse = await axios.post(
            "http://localhost:8080/payFee",
            paymentDetails
          );

          if (apiResponse.status === 200) {
            alert("Payment Successful and Registered!");
          } else {
            alert("Failed to register payment. Please try again.");
          }
        } catch (error) {
          console.error("Error processing payment:", error);
          alert("An error occurred while registering the payment.");
        }
      },
      prefill: {
        name: student?.name || "",
        email: student?.email || "",
        contact: student?.contact || "",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.on("payment.failed", function (response) {
      alert("Payment failed: " + response.error.description);
    });
    razorpay.open();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Stopbar />
      <div className="flex flex-1">
        <Ssidebar />
        <div className="flex-1 p-10 bg-gray-100">
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            Pay Your Fee
          </h1>

          {student ? (
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Fee Type:
                </label>
                <select
                  value={feeType}
                  onChange={(e) => setFeeType(e.target.value)}
                  className="w-full p-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Fee Type</option>
                  <option value="Tuition">Tuition</option>
                  <option value="Hostel">Hostel</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Fee Amount (₹):
                </label>
                <input
                  type="number"
                  value={feeAmount}
                  onChange={(e) => setFeeAmount(e.target.value)}
                  className="w-full p-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Pay ₹{feeAmount || 0}
              </button>
            </div>
          ) : (
            <p className="text-center text-gray-600">
              Loading student details...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayFee;
