const workoutRoutes = require("../routes/workouts");
const Workout = require("../models/workoutModel");
const { default: mongoose } = require("mongoose");
const fs = require("fs");
const fetch = require("cross-fetch");

//get all workouts

const getWorkouts = async (req, res) => {
  fetch("http://localhost:8000/employee")
    .then((res) => {
      return res.json();
    })
    .then((resp) => {
      //console.log(resp);
      if (!resp) {
        return res.status(404).json({ error: "No Record found" });
      }
      //res.send(resp);
      res.status(200).json(resp);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  fetch("http://localhost:8000/employee/" + id)
    .then((res) => {
      return res.json();
    })
    .then((resp) => {
      if (!resp) {
        return res.status(201).json({ error: "No Record found" });
      }
      res.status(200).json(resp);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// create new workout
const createWorkout = async (req, res) => {
  //const { name, email, phone} = req.body;
  const empdata = req.body;
  //console.log(req.body);
  fetch("http://localhost:8000/employee", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(empdata),
  })
  .then((resp) => {
    return res.status(200).json({ message: "1" });
  })
  .catch((err) => {
    return res.status(404).json({ message: "0" });
  });
};

// delete workout
const deleteWorkout = async (req, res) => {
  const empId = req.params.id;
  fetch("http://localhost:8000/employee/" + empId, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  })
    .then((res) => {
      return res.json();
    })
    .then((resp) => {
      return res.status(200).json({ message: "Record Deleted Successfully" });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//delete multiple workout
const deleteWorkouts = async (req, res) => {
  const eleid = req.body;
  console.log(eleid);
  const delFetch = eleid.map((id) => {
    return fetch("http://localhost:8000/employee/" + id, {
      method: "DELETE",
    })
    .then((resp) => {
      return res.status(200).json({ message: "Record Deleted Successfully" });
    })
    .catch((err) => {
      console.log(err.message);
    });
  });
};

// update workout
const updateWorkout = async (req, res) => {
  const empid = req.params.id;
  const empdata = req.body;

  fetch("http://localhost:8000/employee/" + empid, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(empdata),
  })
    .then((res) => {
      return res.json();
    })
    .then((resp) => {
      return res.status(200).json({ message: "Record Updated Successfully" });
      //navigate('/');
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
  deleteWorkouts,
};
