import React, { useState, useEffect, useContext } from 'react';
import RatingStars from './RatingStars';
import CommentAvatar from './CommentAvatar';


function CommentThreads({ comments, relevant_shelterEmail }) {

    const getReplyType = (comment, reply) => {
        let replyClass = '';
        let replyText = '';
    
        if (comment.author === reply.author) {
            replyClass = 'aReply';
            replyText = 'Author Reply';
        } else if (reply.author === relevant_shelterEmail) {
            replyClass = 'sReply';
            replyText = 'Shelter Reply';
        }
    
        return { replyClass, replyText };
    };

    return (
        <div>
            {comments.map(comment => (
                <div key={comment.id} className="darker d-flex flex-start justify-content-center col-lg-12 mt-4">
                    <CommentAvatar key={'comment'+comment.id} comment={comment} />
                    <div className="flex-grow-1 flex-shrink-1">
                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-1">
                                    {comment.author} <span className="small">- {new Date(comment.created_at).toLocaleTimeString()}</span>
                                </p>
                                {/* Add reply link functionality */}
                                <a href="#!"> 
                                    <span className="small">details
                                    </span>
                                </a>
                            </div>

                            <RatingStars rating={comment.rating} />

                            <p className="small mb-0">
                                {comment.text}
                            </p>
                        </div>

                        {comment.replies.map(reply => {
                            const { replyClass, replyText } = getReplyType(comment, reply);
                            
                            return (
                                <div key={reply.id} className="d-md-flex flex-start justify-content-center col-lg-12 mt-4">
                                    <CommentAvatar key={'reply'+reply.id} comment={reply} />
                                    <div className="flex-grow-1 flex-shrink-1">
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="mb-1">
                                                    {reply.author} <span className="small">- {new Date(reply.created_at).toLocaleTimeString()}</span>
                                                </p>
                                            </div>
                                            <p className="small mb-0">
                                                {replyText &&  <span className={`small p-1 ${replyClass}`}><label>{replyText}</label></span> }   
                                            </p>
                                            <div className='small mb-0 mt-3'>{reply.text}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            ))}
        </div>
    );



}

export default CommentThreads;
