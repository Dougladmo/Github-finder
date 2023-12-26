import { FaSpinner } from 'react-icons/fa'
import styles from './loader.module.css'

const Loader = () => {
  return (
    <>
        <FaSpinner className={styles.loader} />
    </>
  )
}

export default Loader