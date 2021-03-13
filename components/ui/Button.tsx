import { ReactNode } from "react";
import Link from "next/link";

import styles from "./Button.module.css";

export interface ButtonProps {
  children: ReactNode;
  link: string;
}

function Button({ link, children }: ButtonProps) {
  return (
    <Link href={link}>
      <a className={styles.btn}>{children}</a>
    </Link>
  );
}

export default Button;
