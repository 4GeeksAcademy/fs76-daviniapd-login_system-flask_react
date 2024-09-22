import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const ProfileTab = ({ post }) => {
    const { store, actions } = useContext(Context);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isComment, setIsComment] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false); 
    const [comment, setComment] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        console.log((`Comment added: ${comment}`));
        setComment("");
        setShowModal(false);
        setIsComment(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && comment.trim() !== '') {
            handleCommentSubmit(e);
        }
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    const handleComment = () => {
        setIsComment(true);
        setShowModal(true);
    };
    const handleShare = () => {
        setShowShareModal(true); 
    };

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
                            <div className="dropdown options ms-auto p-2 bd-highlight my-auto me-3 fs-4">
                                <button
                                    type="button"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                    data-bs-toggle="dropdown" aria-expanded="false">

                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                </button>

                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <a className="dropdown-item" href="#" onClick={handleLike}>
                                            {isLiked ? "Don't like" : "Like"}
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#" onClick={handleComment}>
                                            Add Comment
                                        </a>
                                    </li>

                                </ul>

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
                                <i
                                    className={`${isComment ? 'fa-solid fa-comment text-warning' : 'fa-regular fa-comment'}`}
                                    style={{ cursor: "pointer", marginRight: "10px" }}
                                    onClick={() => { setIsComment(!isComment); setShowModal(true) }}
                                />
                                <i
                                    className={`fa-regular fa-paper-plane me-2 ${showShareModal ? 'text-warning' : ''}`}
                                    style={{ cursor: "pointer" }}
                                    onClick={handleShare}
                                />
                                <i
                                    className={`${isSaved ? 'fa-solid fa-bookmark text-warning' : 'fa-regular fa-bookmark'}`}
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

            <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add comment</h5>
                            <button type="button" className="btn-close btn-warning" onClick={() => {
                                setShowModal(false);
                                setIsComment(false);
                            }} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleCommentSubmit}>
                                <div className="form-group">
                                    <textarea
                                        className="form-control custom-modal-body"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        placeholder="Write your comment here..."
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-warning mt-2 float-end">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`modal ${showShareModal ? 'show' : ''}`} style={{ display: showShareModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Share Post</h5>
                            <button type="button" className="btn-close btn-warning" onClick={() => setShowShareModal(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Who are you kidding? You have no friends to share this post with.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
