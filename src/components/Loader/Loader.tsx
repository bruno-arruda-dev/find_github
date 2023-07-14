import classes from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={classes.ldsSpinnerContainer}>
      <div className={classes.ldsSpinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
}

export default Loader;