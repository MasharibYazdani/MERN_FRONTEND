import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Spiner from "../../components/Spinner/Spinner";
import { useParams } from "react-router-dom";
import { singleUsergetfunc } from "../../services/Apis";
import { BASE_URL } from "../../services/helper";
import moment from "moment";
import "./profile.css";

const Profile = () => {
  const [userprofile, setuserprofile] = useState({});

  const [showspin, setshowspin] = useState(true);

  const { id } = useParams();

  const userProfileGet = async () => {
    const response = await singleUsergetfunc(id);
    if (response.status === 200) {
      setuserprofile(response.data);
    } else {
      console.log("Error while getting single user");
    }
  };

  useEffect(() => {
    userProfileGet();
    setTimeout(() => {
      setshowspin(false);
    }, 1200);
  }, [id]);

  return (
    <>
      {showspin ? (
        <Spiner />
      ) : (
        <div className="container">
          <Card className="card-profile shadow col-lg-6 mx-auto mt-5">
            <Card.Body>
              <Row>
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center">
                    <img
                      src={`${BASE_URL}/uploads/${userprofile.profile}`}
                      alt="img"
                    />
                  </div>
                </div>
              </Row>
              <div className="text-center">
                <h3>{userprofile.fname + " " + userprofile.lname}</h3>
                <h4>
                  <i className="fa-solid fa-envelope email"></i>&nbsp;{" "}
                  <span>{userprofile.email}</span>
                </h4>

                <h5>
                  <i className="fa-solid fa-mobile"></i>&nbsp;{" "}
                  <span>{userprofile.mobile}</span>
                </h5>

                <h4>
                  <i className="fa-solid fa-person"></i>&nbsp;{" "}
                  <span>{userprofile.gender}</span>
                </h4>

                <h4>
                  <i className="fa-solid fa-location-crosshairs location"></i>
                  &nbsp; <span>{userprofile.location}</span>
                </h4>

                <h4>
                  Status :&nbsp; <span>{userprofile.status}</span>
                </h4>

                <h5>
                  <i className="fa-solid fa-calendar-days calender"></i>
                  &nbsp;Date Created : &nbsp;
                  <span>
                    {moment(userprofile.dateCreated).format("DD-MM-YYYY")}
                  </span>
                </h5>

                <h5>
                  <i className="fa-solid fa-calendar-days calender"></i>
                  &nbsp;Date Updated : &nbsp;
                  <span>{userprofile.dateUpdated} </span>
                </h5>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default Profile;
