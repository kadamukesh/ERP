import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa"; // Importing the search icon

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/viewstudent")
      .then((response) => {
        setStudents(response.data);
        setFilteredStudents(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the students!", error);
      });
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered = students.filter(
      (student) =>
        student.name.toLowerCase().includes(term.toLowerCase()) ||
        student.uid.toString().includes(term) ||
        student.contact.toString().includes(term)
    );

    setFilteredStudents(filtered);
  };

  const handleDelete = (uid) => {
    axios
      .delete(`http://localhost:8080/deletestudent/${uid}`)
      .then((response) => {
        setStudents(students.filter((student) => student.uid !== uid));
        setFilteredStudents(
          filteredStudents.filter((student) => student.uid !== uid)
        );
      })
      .catch((error) => {
        console.error("There was an error deleting the student!", error);
        alert("Failed to delete student");
      });
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    window.location.href = "/updatestudent";
  };

  const styles = {
    searchContainer: {
      position: "relative",
      width: "100%",
      marginBottom: "20px",
    },
    searchInput: {
      padding: "10px 40px 10px 15px", // Adjust for icon padding
      width: "100%",
      border: "1px solid #ddd",
      borderRadius: "4px",
    },
    searchIcon: {
      position: "absolute",
      top: "50%",
      right: "15px",
      transform: "translateY(-50%)",
      color: "#888",
      fontSize: "18px",
      pointerEvents: "none",
    },
    table: {
      borderCollapse: "collapse",
      width: "100%",
    },
    th: {
      backgroundColor: "#4a90e2",
      color: "white",
      padding: "12px 15px",
      textAlign: "left",
    },
    td: {
      padding: "12px 15px",
      textAlign: "left",
      borderBottom: "1px solid #ddd",
    },
    tr: {
      transition: "background-color 0.2s",
    },
    trHover: {
      backgroundColor: "#e0f7fa",
    },
    img: {
      height: "64px",
      width: "64px",
      objectFit: "cover",
      borderRadius: "50%",
      transition: "transform 0.2s",
      border: "2px solid #4a90e2",
    },
    imgHover: {
      transform: "scale(1.1)",
    },
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: isModalOpen ? "flex" : "none",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modalImage: {
      maxWidth: "90%",
      maxHeight: "90%",
      cursor: "pointer",
    },
    iconContainer: {
      display: "flex",
      gap: "10px",
    },
    icon: {
      fontSize: "20px",
      cursor: "pointer",
      transition: "color 0.2s",
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-10 bg-gray-100">
          <h1
            className="text-3xl font-bold text-center"
            style={{ marginBottom: "20px" }}
          >
            View Students
          </h1>

          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by Name, UID, or Contact"
              value={searchTerm}
              onChange={handleSearch}
              style={styles.searchInput}
            />
            <FaSearch style={styles.searchIcon} />
          </div>

          <div className="overflow-x-auto">
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Department</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Contact</th>
                  <th style={styles.th}>Photo</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student.uid}
                    style={styles.tr}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        styles.trHover.backgroundColor)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "")
                    }
                  >
                    <td style={styles.td}>{student.uid}</td>
                    <td style={styles.td}>{student.name}</td>
                    <td style={styles.td}>{student.department}</td>
                    <td style={styles.td}>{student.email}</td>
                    <td style={styles.td}>{student.admissionType}</td>
                    <td style={styles.td}>{student.contact}</td>
                    <td style={styles.td}>
                      <img
                        src={`data:image/jpeg;base64,${student.image}`}
                        alt="Student"
                        style={styles.img}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform =
                            styles.imgHover.transform)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "")
                        }
                        onClick={() =>
                          handleImageClick(
                            `data:image/jpeg;base64,${student.image}`
                          )
                        }
                      />
                    </td>
                    <td style={styles.td}>
                      <div style={styles.iconContainer}>
                        <FaEdit style={styles.icon} onClick={handleEdit} />
                        <FaTrash
                          style={styles.icon}
                          onClick={() => handleDelete(student.uid)}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = "#ff0000")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "")
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isModalOpen && (
            <div style={styles.modal} onClick={() => setIsModalOpen(false)}>
              <img
                src={selectedImage}
                alt="Full Size"
                style={styles.modalImage}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewStudents;
