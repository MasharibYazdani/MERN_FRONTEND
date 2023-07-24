import React, { useState, useEffect } from "react";
import "./edit.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Spiner from "../../components/Spinner/Spinner";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify"; //For validation of form input data
import "react-toastify/dist/ReactToastify.css";

const Edit = () => {
  const [inputdata, setinputdata] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });

  const [status, setstatus] = useState("Active");
  const [image, setimage] = useState("");

  //To preview profile picture
  const [preview, setpreview] = useState("");

  //For spinner
  const [showspin, setshowspin] = useState(true);

  //status options
  const options = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  //set input values
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setinputdata({ ...inputdata, [name]: value });
  };

  //set status
  const setStatusValue = (e) => {
    setstatus(e.value);
  };

  //profile set
  const setProfile = (e) => {
    setimage(e.target.files[0]);
  };

  //set preview of profile picture also check condition in img tag
  useEffect(() => {
    if (image) {
      setpreview(URL.createObjectURL(image));
    }

    setTimeout(() => {
      setshowspin(false);
    }, 1200);
  }, [image]);

  //submit the form without loading the page
  const submitUserData = (e) => {
    e.preventDefault();

    const { fname, lname, email, mobile, gender, location } = inputdata;

    //Using toastify to validate all the input
    //We didn't check for status because it is by default active (see usestate)
    if (fname === "") {
      toast.error("First name is Required");
    } else if (lname === "") {
      toast.error("Last name is Required");
    } else if (email === "") {
      toast.error("Email is Required");
    } else if (!email.includes("@")) {
      toast.error("Please enter a valid Email");
    } else if (mobile === "") {
      toast.error("Mobile no is Required");
    } else if (!(mobile.length === 10)) {
      toast.error("Please enter a valid Mobile no");
    } else if (gender === "") {
      toast.error("Gender is Required");
    } else if (image === "") {
      toast.error("Image is Required");
    } else if (location === "") {
      toast.error("Location is Required");
    } else {
      toast.success("Registration Successful");
    }
  };

  return (
    <>
      {showspin ? (
        <Spiner />
      ) : (
        <div className="container">
          <h2 className="text-center mt-1">Update Your Details</h2>
          <Card className="shadow mt-3 p-3">
            <div className="profile_div text-center">
              <img src={preview ? preview : "/man.png"} alt="img" />
            </div>
            <Form>
              <Row>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    placeholder="Enter First Name"
                    value={inputdata.fname}
                    onChange={setInputValue}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lname"
                    placeholder="Enter Last Name"
                    value={inputdata.lname}
                    onChange={setInputValue}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={inputdata.email}
                    onChange={setInputValue}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Mobile No</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    placeholder="Enter Mobile No"
                    value={inputdata.mobile}
                    onChange={setInputValue}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select Your Gender</Form.Label>
                  <Form.Check // prettier-ignore
                    type={"radio"}
                    label={"Male"}
                    name="gender"
                    value={"Male"}
                    onChange={setInputValue}
                  />

                  <Form.Check // prettier-ignore
                    type={"radio"}
                    label={"Female"}
                    name="gender"
                    value={"Female"}
                    onChange={setInputValue}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select Your Status</Form.Label>
                  <Select
                    options={options}
                    value={status}
                    onChange={setStatusValue}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select Your Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    name="user_profile"
                    placeholder="Chose Your Profile"
                    onChange={setProfile}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Enter Your Location</Form.Label>
                  <Form.Control
                    type="location"
                    name="location"
                    placeholder="Enter Your Location"
                    value={inputdata.location}
                    onChange={setInputValue}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  onClick={submitUserData}
                >
                  Submit
                </Button>
              </Row>
            </Form>
          </Card>
          {/* For validation */}
          <ToastContainer position="top-center" />
        </div>
      )}
    </>
  );
};

export default Edit;
