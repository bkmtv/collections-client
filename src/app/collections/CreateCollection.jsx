import { useEffect, useState } from "react";
import axios from "axios";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { URI } from "@constants/api";
import { FormattedMessage } from "react-intl";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import "./Collections.css";

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "Media",
  });
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name + v4());
      const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setLoading(progress);
      }, 
      (error) => {
        console.log(error);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({...prev, image: downloadURL}));
        });
      }
    );
    }
    file && uploadFile();
  }, [file])
  
  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await axios.post(URI + "collection", formData, {
        headers: { token: localStorage.getItem("token") },
      });
      navigate(-1);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="form m-auto">
    <h4 className="mt-4 text-center"><FormattedMessage id="app.profile.createclc" /></h4>
    <form onSubmit={handleSubmit}>
      <label className="mt-3 mb-1"><FormattedMessage id="app.profile.createclc.title" /></label>
      <input
        type="text"
        name="title"
        maxLength="35"
        value={formData.title}
        onChange={handleChange}
        className="form-control"
      />
      <label className="mt-3 mb-1"><FormattedMessage id="app.profile.createclc.desc" /></label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="form-control"
      />
      <label className="mt-3 mb-1"><FormattedMessage id="app.profile.createclc.topic" /></label>
      <select className="form-select" name="topic" value={formData.topic} onChange={handleChange}>
        <option value="Media"><FormattedMessage id="app.profile.createclc.media" /></option>
        <option value="People"><FormattedMessage id="app.profile.createclc.people" /></option>
        <option value="Things"><FormattedMessage id="app.profile.createclc.things" /></option>
      </select>
      <label name="image" className="mt-3 mb-1"><FormattedMessage id="app.profile.createclc.img" /></label><br />
      <input type="file"  onChange={(e) => setFile(e.target.files[0])} /><br />
      <button disabled={loading !== null && loading < 100} className="btn btn-primary mt-4 w-100" type="submit">
        {loading !== null && loading < 100 &&
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}&ensp;
        <FormattedMessage id="app.auth.sign-up.btn" />
        </button>
    </form>
    </div>
  );
};

export default Form;