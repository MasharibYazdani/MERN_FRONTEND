import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import "./profile.css";

const Profile = () => {
  return (
    <>
      <div className="container">
        <Card className="card-profile shadow col-lg-6 mx-auto mt-5">
          <Card.Body>
            <Row>
              <div className="col">
                <div className="card-profile-stats d-flex justify-content-center">
                  <img src="/man.png" alt="img" />
                </div>
              </div>
            </Row>
            <div className="text-center">
              <h3>Masharib Yazdani</h3>
              <h4>
                <i className="fa-solid fa-envelope email"></i>&nbsp;{" "}
                <span>masharibyazdani@gmail.com</span>
              </h4>

              <h5>
                <i class="fa-solid fa-mobile"></i>&nbsp; <span>9453682554</span>
              </h5>

              <h4>
                <i class="fa-solid fa-person"></i>&nbsp; <span>Male</span>
              </h4>

              <h4>
                <i class="fa-solid fa-location-crosshairs location"></i>&nbsp;{" "}
                <span>Jaunpur</span>
              </h4>

              <h4>
                Status :&nbsp; <span>Active</span>
              </h4>

              <h5>
                <i class="fa-solid fa-calendar-days calender"></i>&nbsp;Date
                Created : &nbsp;
                <span>{Date()}</span>
              </h5>

              <h5>
                <i class="fa-solid fa-calendar-days calender"></i>&nbsp;Date
                Updated : &nbsp;
                <span></span>
              </h5>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Profile;
