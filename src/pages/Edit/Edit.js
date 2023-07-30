import React, { useState, useEffect, useContext } from "react";
import "./edit.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Spiner from "../../components/Spinner/Spinner";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify"; //For validation of form input data
import "react-toastify/dist/ReactToastify.css";
import { editfunc, singleUsergetfunc } from "../../services/Apis";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../services/helper";
import { updateData } from "../../components/Context/ContextProvider";

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

  //To set image during updation of profile
  const [imgdata, setImgdata] = useState("");

  //To preview profile picture
  const [preview, setpreview] = useState("");

  //For spinner
  const [showspin, setshowspin] = useState(true);

  const { id } = useParams(); //Getting id of particular user

  const navigate = useNavigate();

  const { update, setUpdate } = useContext(updateData);

  //status options
  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
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

  const userProfileGet = async () => {
    const response = await singleUsergetfunc(id);
    if (response.status === 200) {
      setinputdata(response.data);
      setstatus(response.data.status);
      setImgdata(response.data.profile);
    } else {
      console.log("Error while getting single user");
    }
  };

  useEffect(() => {
    userProfileGet();
  }, [id]);

  //set preview of profile picture also check condition in img tag
  useEffect(() => {
    if (image) {
      setImgdata("");
      setpreview(URL.createObjectURL(image));
    }

    setTimeout(() => {
      setshowspin(false);
    }, 1200);
  }, [image]);

  //submit the form without loading the page
  const submitUserData = async (e) => {
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
    } else if (location === "") {
      toast.error("Location is Required");
    } else {
      //Sending data to the backend
      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("location", location);
      data.append("gender", gender);
      data.append("status", status);
      data.append("user_profile", image || imgdata);

      const config = {
        "Content-Typer": "multipart/form-data",
      };

      const response = await editfunc(id, data, config);

      if (response.status === 200) {
        setUpdate(response.data);
        navigate("/");
      }
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
              <img
                src={image ? preview : `${BASE_URL}/uploads/${imgdata}`}
                alt="img"
              />
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
                    checked={inputdata.gender === "Male" ? true : false}
                    onChange={setInputValue}
                  />

                  <Form.Check // prettier-ignore
                    type={"radio"}
                    label={"Female"}
                    name="gender"
                    value={"Female"}
                    checked={inputdata.gender === "Female" ? true : false}
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
                    defaultValue={status}
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
