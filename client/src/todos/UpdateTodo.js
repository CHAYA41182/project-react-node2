import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Rating from 'react-rating';
import { useParams } from "react-router";


const UpdateTodo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState([]);
    const [rating, setRating] = useState(2);

    const getTodo = async () => {
        try {
            const { data } = await axios.get(`http://localhost:7001/api/tasks/${id}`)
            setTodo(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getTodo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const Todo = {
            title: e.target.title.value,
            description: e.target.description.value,
            date: `${e.target.date.value}T${e.target.time.value}Z`,
            icon: e.target.icon.value,
            important: e.target.important.checked,
            range: rating
        };

        await axios.put(`http://localhost:7001/api/tasks/${id}`, Todo).then(() => {
            navigate('/todos');
        })
    };

    const fullDate = new Date(todo.date);
    let date = '';
    let time = '';

    if (!isNaN(fullDate)) { // check if date is valid
        date = fullDate.toISOString().slice(0, 10);
        time = fullDate.toISOString().slice(11, 16);
    }

    return (
        <div className="create-container">
            <Link to="/todos" ><FontAwesomeIcon icon={faRightFromBracket} /></Link>
            <h1 className="create--title">Update Todo</h1>
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
                        <input type="text" name="icon" className="form-control" maxLength={8} required defaultValue={todo.icon} style={{ width: "20px" }} />
                    </div>
                    <div className="important-container">
                        <input type="checkbox" name="important" className="form-control" defaultChecked={todo.important} />
                        <label htmlFor="important">important</label>
                    </div>
                </div>
                <div className="title-container">
                    <label htmlFor="title">title</label>
                    <input type="text" name="title" className="form-control" required defaultValue={todo.title} />
                </div>
                <div className="description-container">
                    <label htmlFor="description">description</label>
                    <input type="text" name="description" className="form-control" required defaultValue={todo.description} />
                </div>
                <div className="date-time-container">
                    <div className="date-container">
                        <label htmlFor="date">date</label>
                        <input type="date" name="date" className="form-control" required defaultValue={date} />
                    </div>
                    <div className="time-container">
                        <label htmlFor="time">time</label>
                        <input type="time" name="time" className="form-control" required defaultValue={time} />
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateTodo;