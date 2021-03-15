import { ReactNode } from "react";
import classes from "./ErrorAlert.module.css";

export interface ErrorAlertProps {
  children: ReactNode;
}

function ErrorAlert(props: ErrorAlertProps) {
  return <div className={classes.alert}>{props.children}</div>;
}

export default ErrorAlert;
