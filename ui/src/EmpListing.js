import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import $ from "jquery";
import { HiSwitchVertical } from "react-icons/hi";
import { CSVLink } from "react-csv";


const EmpListing = () => {
  const [empdata, empdatachange] = useState(null);
  const [empId, empidchange] = useState([]);
  const [order, setordrd] = useState("ASC");
  const tableRef = useRef(null);
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/employee/detail/" + id);
  };
  const LoadEdit = (id) => {
    navigate("/employee/edit/" + id);
  };
  const CreateDetails = () => {
    navigate("/employee/create");
  };

  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:8001/api/workouts/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8001/api/workouts/")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log(resp);
        empdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // Code Added BY Tausif ON 25 Nov 2022

  $(document).ready(function () {
    const elem = $(".tycheck input[type=checkbox]"); //select the checkbox elem
    elem.on("change", function () {
      checker(elem); //get the checked value list
    });
    $("#checkedAll").on("change", function () {
      elem.prop("checked", $(this).is(":checked")); //for select all simply compare with checkall button
      checker(elem);
    });
  });

  function checker(elem) {
    let res = elem
      .map((i, item) => {
        if ($(item).is(":checked")) {
          return $(item).val();
        }
      })
      .get();
    console.log(res);
    empidchange(res);
  }

  async function removeAll() {
    //alert(empId)
    if (!empId.length == 0) {
      if (window.confirm("Do you want to remove?")) {
         fetch("http://localhost:8001/api/workouts/", {
            method: "DELETE",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(empId)
          })
          .then((res) => {
            alert("Removed multiple record successfully.");
            window.location.reload();
          })
          .catch((err) => {
            console.log(err.message);
          });
        
        
        
      }
    } else {
      alert("You need check atleast one checkbox");
    }

  }
  // end here

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...empdata].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      empdatachange(sorted);
      setordrd("DSC");
    }
    if (order === "DSC") {
      const sorted = [...empdata].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      empdatachange(sorted);
      setordrd("ASC");
    }
  };

  return (
    <center>
      <div className="container">
        <div className="card cardsize">
          <div className="card-title">
            <h2>Employee Listing</h2>
          </div>
          <div className="card-body">
            <div className="divbtn">
              <a
                onClick={() => {
                  CreateDetails();
                }}
                className="btn btn-success"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-plus-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                </svg>
              </a>
            </div>
            <div className="divbtn">
              <a
                onClick={() => {
                  removeAll();
                }}
                className="btn btn-danger"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-archive-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                </svg>
              </a>
            </div>
            
            <div className="divbtn">
              <DownloadTableExcel
                filename="users table"
                sheet="users"
                currentTableRef={tableRef.current}
              >
                <button className="btn btn-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-down-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                  </svg>
                </button>
              </DownloadTableExcel>
            </div>
            <br />
            <table
              ref={tableRef}
              className="table table-bordered table table-hover fixed_header"
            >
              <thead className="bg-dark text-white stickheader">
                <tr>
                  <td>
                    <input type="checkbox" name="checkedAll" id="checkedAll" />
                  </td>
                  {/* <input type="checkbox" onClick={toggle} name="checkedAll" id="checkedAll" /> */}
                  <td onClick={() => sorting("id")}>
                    Id
                    <button className="ms-2">
                      <HiSwitchVertical />
                    </button>
                  </td>
                  <td onClick={() => sorting("name")}>
                    Name
                    <button className="ms-2">
                      <HiSwitchVertical />
                    </button>
                  </td>
                  <td onClick={() => sorting("email")}>
                    Email
                    <button className="ms-2">
                      <HiSwitchVertical />
                    </button>
                  </td>
                  <td onClick={() => sorting("phone")}>
                    Phone
                    <button className="ms-2">
                      <HiSwitchVertical />
                    </button>
                  </td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {empdata &&
                  empdata.map((item, index) => (
                    <tr key={item.id}>
                      {/* <div> {console.log(item.name,index)}</div> */}

                      <div class="tycheck">
                        <input
                          type="checkbox"
                          name="checkAll"
                          value={item.id}
                          class="checkSingle"
                        />
                      </div>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>

                      <td>
                        <a
                          onClick={() => {
                            LoadEdit(item.id);
                          }}
                          className="btn btn-success"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pencil-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                          </svg>
                        </a>
                        <a
                          onClick={() => {
                            Removefunction(item.id);
                          }}
                          className="btn btn-danger"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-archive-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                          </svg>
                        </a>
                        <a
                          onClick={() => {
                            LoadDetail(item.id);
                          }}
                          className="btn btn-primary"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-eye-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                          </svg>
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </center>
  );
};

export default EmpListing;
