import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URI } from "../../../shared/constants/api";
import * as Icon from "react-bootstrap-icons";

export default function ItemPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [itemObj, setItemObj] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    //const [likes, setLikes] = useState([]);

    useEffect(() => {
        axios.get(URI + "item/byitemId/" + id).then((response) => {
            setItemObj(response.data);
        });
        axios.get(URI + "comment/" + id).then((response) => {
            setComments(response.data);
        });
    }, [id]);

    const addComment = () => {
        axios.post(URI + "comment", { commentBody: newComment, ItemId: id },
            { headers: { token: localStorage.getItem("token") } }).then((response) => {
              const commentToAdd = {
                commentBody: newComment,
                username: response.data.username,
              };
              setComments([...comments, commentToAdd]);
              setNewComment("");
          });
      };
    
      const likeItem = (itemId) => {
        axios.post(URI + "like", { ItemId: itemId },
            { headers: { token: localStorage.getItem("token") } }).then(() => {
              console.log("Liked");
      })
    };

    return (
        <>
        <button onClick={() => {navigate(-1)}} className="btn btn-sm btn-outline-secondary mb-3">
            <Icon.ArrowLeftSquare />&ensp;Back to collection
        </button>

        <h3>{itemObj.name} </h3>
        <p>Tags</p>

        <button onClick={() => likeItem(itemObj.id)}>
          <Icon.Heart />
        </button><br />

        <label className="mt-3 mb-1">Leave a comment</label>
        <textarea
            type="text"
            autoComplete="off"
            className="form-control"
            id="comment"
            value={newComment}
            onChange={(event) => { setNewComment(event.target.value) }}
          />
        <button
            className="btn btn-sm btn-primary my-3"
            onClick={addComment}>
            Sumbit
        </button>

        <div>
          {comments.map((comment, key) => {
            return (
              <div className="card my-2"key={key}>
                <div className="card-body">
                    {comment.commentBody}
                    <div className="card-link text-muted mt-2"><Icon.Person /> {comment.username}</div>
                </div>
              </div>
            );
          })}
        </div>
        </>
    )
}