import styles from "./style/home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🏳️‍🌈 Lista de amigos viadassos 🏳️‍🌈</h1>
      <ul className={styles.list}>
        <li className={styles.item}>- Bruno Fidalgo</li>
        <li className={styles.item}>- Tuta Olivares</li>
        <li className={styles.item}>- Gabomel Assasino</li>
      </ul>
    </div>
  );
}

export default Home;
