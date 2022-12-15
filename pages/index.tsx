import Head from "next/head";
import Image from "next/image";
import {
  ChangeEvent,
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  useRef,
  useState,
} from "react";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img className={styles.memeImg} src="meme.png" />
        <div className={styles.card}>
          <div className={styles.handle} />
          <div className={styles.navButtonRow}>
            <NavButton type={"text"} />
            <NavButton type={"stickers"} />
            <NavButton type={"layout"} />
            <NavButton type={"template"} />
            <NavButton type={"share"} />
          </div>

          {/* <Input /> */}
        </div>
      </main>
    </div>
  );
}

type NavButtonProps = {
  type: string;
};

function NavButton({ type }: NavButtonProps) {
  return (
    <button className={styles.navButton}>
      <img className={styles.navIcon} src={`icon-${type}.svg`} />
      <p className={styles.navLabel}>{type}</p>
    </button>
  );
}

function Input() {
  const ref = useRef(null);
  const [text, setText] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  return (
    <input
      ref={ref}
      onChange={handleChange}
      placeholder="write text here..."
      value={text}
    />
  );
}
