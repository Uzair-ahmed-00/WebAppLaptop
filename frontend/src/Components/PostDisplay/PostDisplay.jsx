import React from "react";
import "./PostDisplay.css";
import { useNavigate } from "react-router-dom";
import DescriptionBox from "../DescriptionBox/DescriptionBox";
//import io from "socket.io-client";
import Chat from "../../Pages/Chat";

const PostDisplay = (props) => {
  let navigate = useNavigate();
  const { posts } = props;

  const sendMessage = (recipientId, recipientName) => {
    const senderId = localStorage.getItem("userID"); // Get sender's user ID from localStorage

    navigate(`/chat/${recipientId}/${senderId}/${recipientName}`);
  };

  return (
    <div className="container-fluid">
      <div className="row m-5">
        <div className="col-md-8 ">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            style={{
              maxWidth: "100%",
              maxHeight: "500px",
              overflow: "hidden",
              backgroundColor: "black",
            }}
          >
            <div className="carousel-inner">
              {console.log(posts)}

              {posts.map((image, index) => (
                <React.Fragment key={index}>
                  {image.photos.map((photoUrl, photoIndex) => (
                    <div
                      key={index * 1000 + photoIndex}
                      className={`carousel-item ${
                        index === 0 && photoIndex === 0 ? "active" : ""
                      }`}
                    >
                      <img
                        src={photoUrl}
                        className="d-block w-100"
                        alt={`Laptop ${photoIndex + 1}`}
                        style={{
                          maxHeight: "500px",
                          width: "auto",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* Content for the right side */}
        <div className="col-md-4">
          {posts.map((post, index) => (
            <div key={index} className="row ms-3">
              <h1 className="productDisplayHeading"> {post.adTitle} </h1>

              <div className="col-md-6 mt-4">
                <p>
                  <strong> Condition: </strong> {post.condition}
                </p>
                <p>
                  <strong> Brand: </strong> {post.brand}
                </p>
                <p>
                  <strong> Model: </strong> {post.model}
                </p>
                {post.showPhoneNumber && (
                  <p>
                    <strong> Phone Number: </strong> {post.user.phoneNumber}
                  </p>
                )}
                <p>
                  <strong> Region: </strong> {post.region}
                </p>
                <p>
                  <strong> City: </strong> {post.city}
                </p>
                <p>
                  <strong> Price: </strong> {post.price}
                </p>
                <p>
                  <strong> Seller Name: </strong> {post.user.name}
                </p>

                <button
                  className="btn btn-secondary"
                  onClick={() => sendMessage(post.user._id, post.user.name)}
                >
                  Send Message
                </button>
              </div>

              <div className="col-md-6 mt-4">
                {/* Leave this column empty on large screens */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second row for inspector reviews */}
      <div className="row m-5">
        {posts.map((post, index) => (
          <div key={index}>
            <div className="col-md-6 mt-3">
              {post.wantsInspection && post.inspectorReview !== "None" && (
                <div>
                  <h1 className="productDisplayHeading">Inspector Review</h1>
                  <p>{post.inspectorReview}</p>

                  <h5>
                    Inspection Time:
                    {post.inspectionTime &&
                      new Date(post.inspectionTime).toLocaleDateString()}
                  </h5>
                </div>
              )}
              {post.wantsInspection && post.inspectorReview === "None" && (
                <div>
                  <h1 className="productDisplayHeading">Inspector Review</h1>
                  <p>Inspector review is pending</p>
                </div>
              )}
            </div>

            <DescriptionBox description={post.description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDisplay;
