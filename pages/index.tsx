import Head from "next/head";
import Image from "next/image";
import {
  ChangeEvent,
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  RefObject,
  useRef,
  useEffect,
  useState,
} from "react";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const size = useVisualViewportHeight();
  const ogSize = useRef(size);

  useEffect(() => {
    ogSize.current = size;
  }, []);

  function handleOpen() {
    setOpen(true);
    ref.current?.focus();
    console.log(window?.visualViewport?.height);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-navbutton-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#ffffff" />
      </Head>

      <main className={styles.main}>
        <div className={styles.navRow}>
          <AppButton type={"cross"} />
          <div className={styles.splitButton}>
            <AppButton type={"link"} />
            <AppButton type={"elipsis"} />
          </div>
        </div>
        <img className={styles.memeImg} src="meme.png" />

        {open ? (
          <div ref={ref} className={styles.NewText} contentEditable>
            Text
          </div>
        ) : null}

        <div
          ref={cardRef}
          className={styles.card}
          style={{
            bottom: ogSize?.current - size,
          }}
        >
          <div className={styles.handle} />
          <div className={styles.navButtonRow}>
            <div onClick={handleOpen}>
              <NavButton type={"text"} />
            </div>
            <NavButton type={"stickers"} />
            <NavButton type={"layout"} />
            <NavButton type={"template"} />
            <NavButton type={"share"} />
          </div>
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

type AppButtonProps = {
  type: string;
};

function AppButton({ type }: AppButtonProps) {
  return (
    <button className={styles.appButton}>
      <img src={`icon-${type}.svg`}></img>
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
      className={styles.SearchBar}
      ref={ref}
      onChange={handleChange}
      placeholder="write text here..."
      value={text}
    />
  );
}

function useVisualViewportHeight() {
  const [viewportHeight, setViewportHeight] = useState<number | undefined>(
    undefined
  );
  useEffect(() => {
    function handleResize() {
      setViewportHeight(window?.visualViewport?.height);
    }
    window?.visualViewport?.addEventListener("resize", handleResize);
    handleResize();
    return () =>
      window?.visualViewport?.removeEventListener("resize", handleResize);
  }, []);
  return viewportHeight;
}
