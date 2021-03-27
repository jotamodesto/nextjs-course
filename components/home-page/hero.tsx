import Image from "next/image";

import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/jsm.jpg"
          alt="Uma foto minha"
          width={300}
          height={300}
        />
      </div>
      <h1>Oi, meu nome é Johnatan</h1>
      <p>Este blog serve como portfolio do curso de nextjs que eu fiz</p>
    </section>
  );
}

export default Hero;
