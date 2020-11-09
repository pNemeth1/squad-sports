import React from 'react';

import { useState } from 'react';

type CommentProps = {
    comments: [{
        commentBody: string
        commentDate: Date,
        commentUser: string,
        commentUserImage: {
            meta_data: {
                path: string
            }
        }
    }],
    addComment: Function,
    squadId: string
};

const ShowCommentForm: React.FC<CommentProps> = ({ comments, addComment, squadId }) => {
    const [showForm, setShowForm] = useState(false);
    const [state, setState] = useState('');

    const renderComments = (comments) => {
        let list;
        if (comments) {
            console.log(comments)
            list = comments.map((comment) => {
                return (
                    <div className="ui raised card" key={comment._id}>
                        <div className="content">
                            <div className="header">{}</div>
                            <div className="meta">
                                <span className="category">{comment.commentUserFirstName}</span>
                            </div>
                            <div className="description">
                                <p>{comment.commentBody}</p>
                            </div>
                        </div>
                        <div className="extra content">
                            <div className="right floated author">
                                <img className="ui avatar image" src={comment.commentUserImage.meta_data ? comment.commentUserImage.meta_data.path : ''} />
                            </div>
                        </div>
                    </div>
                );

            })
        }

        return list;
    }






    const commentList = renderComments(comments);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            comment: state,
            id: squadId
        }
        addComment(data);
        setState('');
    }

    return (
        <div style={{marginTop: '2rem', marginBottom: '2rem'}}>
            {commentList}
            <button onClick={() => setShowForm(true) as unknown as (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void} className="ui button white">Add Comment</button>
            <br />
            <br />
            <form className={showForm ? 'ui form' : 'u-hide'} onSubmit={handleSubmit}>
                <div className="ui field">
                    <input type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value) as unknown as (event: React.ChangeEvent<HTMLSelectElement>) => void} />
                </div>
                <button className="ui button white">Submit Comment</button>
            </form>
        </div>
    )
}

export default ShowCommentForm;