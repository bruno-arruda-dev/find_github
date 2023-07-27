import classes from './Error.module.scss';
import {BsExclamationTriangleFill} from 'react-icons/bs'

const Error = () => {
  return (
    <div className={classes.error}>
      <BsExclamationTriangleFill />
      <p>Usuário não encontrado</p>
    </div>
  );
}

export default Error;
