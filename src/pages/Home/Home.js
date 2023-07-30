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
import { userGetFunc, deletefunc, exporttocsvfunc } from "../../services/Apis";
import "./home.css";
import { toast } from "react-toastify";

const Home = () => {
  const [userdata, setUserdata] = useState([]);
  const [showspin, setshowspin] = useState(true);
  const { userAdd, setUserAdd } = useContext(addData);

  const { update, setUpdate } = useContext(updateData);

  const { deletedata, setDeletedata } = useContext(deleteData);

  const [search, setSearch] = useState("");

  const [gender, setGender] = useState("All");

  const [status, setStatus] = useState("All");

  const [sort, setSort] = useState("new");

  const [page, setPage] = useState(1);

  const [pageCount, setPageCount] = useState(0);

  //get user
  const userget = async () => {
    const response = await userGetFunc(search, gender, status, sort, page);

    if (response.status === 200) {
      setUserdata(response.data.userdata);
      setPageCount(response.data.Pagination.pageCount);
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

  //Export user to csv

  const exportuser = async () => {
    const response = await exporttocsvfunc();

    if (response.status === 200) {
      window.open(response.data.downloadUrl, "blank");
    } else {
      toast.error("Error While Downloading !");
    }
  };

  //Pagination

  //handle previous button

  const handlePrev = () => {
    setPage(() => {
      if (page === 1) return page;

      return page - 1;
    });
  };

  //handle next button
  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;

      return page + 1;
    });
  };

  useEffect(() => {
    userget();
    setTimeout(() => {
      setshowspin(false);
    }, 1200);
  }, [search, gender, status, sort, page]);

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
                  onChange={(e) => setSearch(e.target.value)}
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
              <Button className="export_btn" onClick={exportuser}>
                Export To CSV
              </Button>
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
                    onChange={(e) => setGender(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={"Male"}
                    name="gender"
                    value={"Male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check // prettier-ignore
                    type={"radio"}
                    label={"Female"}
                    name="gender"
                    value={"Female"}
                    onChange={(e) => setGender(e.target.value)}
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
                  <Dropdown.Item onClick={() => setSort("new")}>
                    New
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("old")}>
                    Old
                  </Dropdown.Item>
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
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={"Active"}
                    name="status"
                    value={"Active"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check // prettier-ignore
                    type={"radio"}
                    label={"InActive"}
                    name="status"
                    value={"InActive"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showspin ? (
          <Spiner />
        ) : (
          <Tables
            userdata={userdata}
            deleteUser={deleteUser}
            userget={userget}
            handlePrev={handlePrev}
            handleNext={handleNext}
            page={page}
            pageCount={pageCount}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
};

export default Home;
