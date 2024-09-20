import React, { useState, useContext } from "react";

import { Context } from "../store/appContext";

export const ProfileTab = ({ post }) => {
    const { store, actions } = useContext(Context);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    return (
        <>
            <div className="container p-3">
                <div className="row d-flex justify-content-center">
                    <div className="col-6 border border-2 rounded p-0">
                        <div className="header d-flex bd-highlight">
                            <div className="profile-image p-2 bd-highlight my-auto">
                                <img className="profile rounded-circle img-fluid" src={post.profileImage} alt="profile picture" />
                            </div>
                            <div className="title p-2 py-0 mb-2 my-auto bd-highlight">
                                <h3>{post.title}</h3>
                            </div>
                            <div className="options ms-auto p-2 bd-highlight my-auto me-3 fs-4">
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                            </div>
                        </div>
                        <div className="imagen">
                            <img src={post.image} className="img-fluid m-0 w-100" alt={post.altText} />
                        </div>
                        <div className="body p-3">
                            <div className="body-icons d-flex justify-content-between align-items-center fs-4 my-2">
                                <i
                                    className={`${isLiked ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart'}`}
                                    style={{ cursor: "pointer", marginRight: "10px" }}
                                    onClick={() => setIsLiked(!isLiked)}
                                />
                                <i className="fa-regular fa-comment me-2" style={{ cursor: "pointer" }}></i>
                                <i className="fa-regular fa-paper-plane me-2" style={{ cursor: "pointer" }}></i>
                                <i
                                    className={`${isSaved ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}`}
                                    style={{ cursor: "pointer", marginLeft: "auto" }}
                                    onClick={() => setIsSaved(!isSaved)}
                                />
                            </div>
                            <p className="likes m-0">Liked by <b>{post.likedBy.join(', ')}</b></p>
                            <p>{post.content} <span className="text-primary">{post.hashtag}</span> </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
