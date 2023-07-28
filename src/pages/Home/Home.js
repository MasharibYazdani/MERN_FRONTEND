import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Spiner from "../../components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Tables from "../../components/Tables/Tables";
import {
  addData,
  deleteData,
  updateData,
} from "../../components/Context/ContextProvider";
import { userGetFunc, deletefunc } from "../../services/Apis";
import "./home.css";
import { toast } from "react-toastify";

const Home = () => {
  const [userdata, setUserdata] = useState([]);
  const [showspin, setshowspin] = useState(true);
  const { userAdd, setUserAdd } = useContext(addData);

  const { update, setUpdate } = useContext(updateData);

  const { deletedata, setDeletedata } = useContext(deleteData);

  //get user
  const userget = async () => {
    const response = await userGetFunc();
    console.log(response);

    if (response.status === 200) {
      setUserdata(response.data);
    } else {
      console.log("Error to get user data");
    }
  };

  //delete user
  const deleteUser = async (id) => {
    const response = await deletefunc(id);

    if (response.status === 200) {
      userget();
      setDeletedata(response.data);
    } else {
      toast.error("Error while deleting");
    }
  };

  useEffect(() => {
    userget();
    setTimeout(() => {
      setshowspin(false);
    }, 1200);
  }, []);

  const navigate = useNavigate();

  const addUser = () => {
    navigate("/register");
  };
  return (
    <>
      {userAdd ? (
        <Alert variant="success" onClose={() => setUserAdd("")} dismissible>
          {userAdd.fname.toUpperCase()} Successfully Added
        </Alert>
      ) : (
        ""
      )}

      {update ? (
        <Alert variant="primary" onClose={() => setUpdate("")} dismissible>
          {update.fname.toUpperCase()} Successfully Updated
        </Alert>
      ) : (
        ""
      )}

      {deletedata ? (
        <Alert variant="danger" onClose={() => setDeletedata("")} dismissible>
          User Deleted Successfully
        </Alert>
      ) : (
        ""
      )}

      <div className="container">
        <div className="main_div">
          {/* search add buttpn */}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button className="search_btn" variant="success">
                  Search
                </Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button variant="primary" onClick={addUser}>
                <i className="fa-solid fa-plus "></i>&nbsp;Add User
              </Button>
            </div>
          </div>
          {/* export,gender,csv */}
          <div className="add_filter mt-5 d-flex justify-content-between">
            <div className="export_csv">
              <Button className="export_btn">Export To CSV</Button>
            </div>
            <div className="filer_gender">
              <div className="filter">
                <h3>Filter By Gender</h3>

                <div className="gender d-flex justify-content-between">
                  <Form.Check
                    type={"radio"}
                    label={"All"}
                    name="gender"
                    value={"All"}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={"Male"}
                    name="gender"
                    value={"Male"}
                  />
                  <Form.Check // prettier-ignore
                    type={"radio"}
                    label={"Female"}
                    name="gender"
                    value={"Female"}
                  />
                </div>
              </div>
            </div>

            {/* sort by new-old */}
            <div className="filter_newold">
              <h3>Sort By Value</h3>
              <Dropdown className="text-center">
                <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                  <i className="fa-solid fa-sort"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>New</Dropdown.Item>
                  <Dropdown.Item>Old</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* filter by Status */}
            <div className="filter_status4">
              <div className="status">
                <h3>Filter By Status</h3>
                <div className="status_radio d-flex justify-content-between flex-wrap ">
                  <Form.Check
                    type={"radio"}
                    label={"All"}
                    name="status"
                    value={"All"}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={"Active"}
                    name="status"
                    value={"Active"}
                  />
                  <Form.Check // prettier-ignore
                    type={"radio"}
                    label={"InActive"}
                    name="status"
                    value={"InActive"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showspin ? (
          <Spiner />
        ) : (
          <Tables userdata={userdata} deleteUser={deleteUser} />
        )}
      </div>
    </>
  );
};

export default Home;
