import axios from "axios";
import { useNavigate } from "react-router-dom";
import Rating from 'react-rating';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";


const CreateTodo = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [icon, setIcon] = useState("");
    const [important, setimportant] = useState(false);
    const [rating, setRating] = useState(2);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const Todo = {
            title: title,
            description: description,
            date: `${date}T${time}Z`,
            icon: icon,
            important: important,
            range: rating
        };


        console.log(Todo)
        await axios.post("http://localhost:7001/api/tasks", Todo).then(() => {

            /*מעביר לדף localhost:3000/todos */
            navigate('/todos');

        })
    };
    console.log('CreateTodo')

    return <div className="create-container">
        <Link to="/todos" ><FontAwesomeIcon icon={faRightFromBracket} /></Link>
        <h1 className="create-title">Create Todo</h1>
        <form className="create-form" onSubmit={handleSubmit}>
            <div className="icon-important-container">
                <div className="rating-container">
                    <Rating className="rating"
                        emptySymbol={<FontAwesomeIcon icon={faStar} color="grey" style={{ fontSize: "24px" }} />}
                        fullSymbol={<FontAwesomeIcon icon={faStar} color="gold" style={{ fontSize: "24px" }} />}
                        value={rating}
                        onChange={(e) => { setRating(e); }}
                        initialRating={2}
                    />
                </div>

                <div className="icon-container">
                    <label htmlFor="icon">icon</label>
                    <input type="text" name="icon" className="form-control" maxLength={8} required onChange={(e) => setIcon(e.target.value)} style={{ width: "20px" }} />
                </div>
                <div className="important-container">
                    <input type="checkbox" name="important" className="form-control" onChange={(e) => { e.target.checked ? setimportant(true) : setimportant(false) }} />
                    <label htmlFor="important">important</label>
                </div>


            </div>

            <div className="title-container">
                <label htmlFor="title">title</label>
                <input type="text" name="title" className="form-control" required onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="description-container">
                <label htmlFor="description">description</label>
                <input type="text" name="description" className="form-control" required onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="date-time-container">
                <div className="date-container">
                    <label htmlFor="date">date</label>
                    <input type="date" name="date" className="form-control" required onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="time-container">
                    <label htmlFor="time">time</label>
                    <input type="time" name="time" className="form-control" required onChange={(e) => setTime(e.target.value)} />

                </div>
            </div>


            <div className="form-group">
                <button type="submit" className="btn btn-primary">Create</button>
            </div>
        </form>

    </div>

};

export default CreateTodo;