import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa"; // Importing the search icon

const ViewFaculty = () => {
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/viewfaculty")
      .then((response) => {
        setFacultyMembers(response.data);
        setFilteredFaculty(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the faculty members!",
          error
        );
      });
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered = facultyMembers.filter(
      (faculty) =>
        faculty.name.toLowerCase().includes(term.toLowerCase()) ||
        faculty.eid.toString().includes(term) ||
        faculty.contact.toString().includes(term)
    );

    setFilteredFaculty(filtered);
  };

  const handleDelete = (eid) => {
    axios
      .delete(`http://localhost:8080/deletefaculty/${eid}`)
      .then((response) => {
        setFacultyMembers(
          facultyMembers.filter((faculty) => faculty.eid !== eid)
        );
        setFilteredFaculty(
          filteredFaculty.filter((faculty) => faculty.eid !== eid)
        );
      })
      .catch((error) => {
        console.error("There was an error deleting the faculty member!", error);
        alert("Faculty Successfully deleted ");
      });
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleEdit = (eid) => {
    window.location.href = `/updatefaculty`;
  };

  const styles = {
    searchContainer: {
      position: "relative",
      width: "100%",
      marginBottom: "20px",
    },
    searchInput: {
      padding: "10px 40px 10px 15px",
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
            View Faculty
          </h1>

          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by Name, ID, or Contact"
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
                  <th style={styles.th}>Contact</th>
                  <th style={styles.th}>Photo</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFaculty.map((faculty) => (
                  <tr
                    key={faculty.eid}
                    style={styles.tr}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        styles.trHover.backgroundColor)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "")
                    }
                  >
                    <td style={styles.td}>{faculty.eid}</td>
                    <td style={styles.td}>{faculty.name}</td>
                    <td style={styles.td}>{faculty.department}</td>
                    <td style={styles.td}>{faculty.email}</td>
                    <td style={styles.td}>{faculty.contact}</td>
                    <td style={styles.td}>
                      <img
                        src={`data:image/jpeg;base64,${faculty.image}`}
                        alt="Faculty"
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
                            `data:image/jpeg;base64,${faculty.image}`
                          )
                        }
                      />
                    </td>
                    <td style={styles.td}>
                      <div style={styles.iconContainer}>
                        <FaEdit
                          style={styles.icon}
                          onClick={() => handleEdit(faculty.eid)}
                        />
                        {/* <FaTrash
                          style={styles.icon}
                          onClick={() => handleDelete(faculty.eid)}
                        /> */}
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

export default ViewFaculty;
