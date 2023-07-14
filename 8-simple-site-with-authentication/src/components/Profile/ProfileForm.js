import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import classes from "./ProfileForm.module.css";
const ProfileForm = () => {
  const history = useHistory();
  const passInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredPassword = passInputRef.current.value;

    fetch("http://localhost:5000/user/changepass", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPass: enteredPassword }),
    }).then((res) => {
      if (res.ok) {
        history.replace("/");
      }
    });
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={passInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
