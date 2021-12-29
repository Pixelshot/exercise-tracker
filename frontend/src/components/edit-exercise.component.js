import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';

export default function EditExercise() {
  let { id } = useParams();
  const inputRef = useRef();
  // const inputEl = useRef(null);

  const [post, setPost] = useState({
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
    users: [],
  });

  // const onSelect = () => {
  //   // inputEl.current.focus();
  //   console.log("userInput");
  // };

  // useEffect(() => {
  //   async function getUsers() {
  //     let response = await axios.get(`http://localhost:5000/exercises`);
  //     let users = response.data.map((user) => user.username);

  //     setPost((prevState) => ({
  //       ...prevState,
  //       users: users,
  //     }));
  //   }
  //   console.log("users:", post);
  //   getUsers();
  // }, [post]);

  useEffect(() => {
    // Async Await
    async function getData() {
      let response = await axios.get(`http://localhost:5000/exercises/${id}`);

      setPost((prevState) => ({
        ...prevState,
        username: response.data.username,
        description: response.data.description,
        duration: response.data.duration,
        date: new Date(response.data.date),
        users: [response.data.username],
      }));
    }
    getData();
  }, [id]);

  // const onChangeUsername = (e) => {
  //   setPost({
  //     username: e.target.value,
  //   });
  // };

  const onChangeDescription = (e) => {
    setPost((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  };
  const onChangeDuration = (e) => {
    setPost((prevState) => ({
      ...prevState,
      duration: e.target.value,
    }));
  };
  const onChangeDate = (date) => {
    setPost((prevState) => ({
      ...prevState,
      date: date,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      ...post,
      // username: post.username,
      description: post.description,
      duration: post.duration,
      date: post.date,
    };

    axios
      .patch(`http://localhost:5000/exercises/update/${id}`, exercise, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => console.log(res.data));

    console.log('exercise:', exercise);
    // console.log('inputRef: ', inputRef.current.value);

    window.location = '/'; // This is going to the the user back to homepage
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            ref={inputRef}
            required
            className="form-control"
            defaultValue={post.username}
            // onChange={onChangeUsername}
          >
            <option value={post.username}>{post.username}</option>
            {/* {post.users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })} */}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={post.description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={post.duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={post.date}
              onChange={onChangeDate}
            />
          </div>
        </div>
        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
          {console.log('post', post)}
        </div>
      </form>
    </div>
  );
}

// Normal get
// axios
//     .get(`http://localhost:5000/exercises/`, {
//       params: {
//         id: `61b936f52f0a82d5057ce96d`,
//       },
//     })
//     .then((response) => {
//       setPost(
//         (prevState) => ({
//           ...prevState,
//           username: response.data.username,
//           description: response.data.description,
//           duration: response.data.duration,
//           // date: new Date(response.date),
//         }),
//         [post]
//       );
//     });
// useEffect(() => {
//   console.log("post: ", post);
// });

// console.log("post: ", post);

// let res = await axios.get("http://localhost:5000/users/")
//   res.data.length !== 0
//     ? setPost({
//         users: res.data.map((user) => user.username),
//       })
//     : setPost({ users: ["test user"] });

// axios
//   .get(`http://localhost:5000/exercises/${post.id}`)
//   .then((response) => {
//     setPost(console.log(response));
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// console.log("post: ", post);

// axios.get("http://localhost:5000/users/").then((res) => {
//   // console.log(res.data);
//   setPost({ users: res.data.map((user) => user.username) });
//   console.log(post);
// });

// console.log(post.users);
// });
