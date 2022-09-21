import { BallTriangle } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderCont}>
      <BallTriangle color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;
