import { FormEvent, useRef } from "react";
import classes from "./profile-form.module.css";

export interface ProfileFormProps {
  onChangePassword: (passwords: {
    oldPassword: string;
    newPassword: string;
  }) => void;
}

function ProfileForm({ onChangePassword }: ProfileFormProps) {
  const newPasswordRef = useRef<HTMLInputElement>();
  const oldPasswordRef = useRef<HTMLInputElement>();

  function submitHandler(event: FormEvent) {
    event.preventDefault();

    const newPassword = newPasswordRef.current.value;
    const oldPassword = oldPasswordRef.current.value;

    onChangePassword({ oldPassword, newPassword });

    newPasswordRef.current.value = "";
    oldPasswordRef.current.value = "";
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
