import { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";

import styles from "./Button.module.css";

export interface ButtonProps {
  children: ReactNode;
  link?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Button({ link, children, onClick }: ButtonProps) {
  if (link) {
    return (
      <Link href={link}>
        <a className={styles.btn}>{children}</a>
      </Link>
    );
  }

  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
