import classes from './Loader.module.scss';

const Loader = () => {
  return (
    <div >
      <div className={classes.ldsSpinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
}

export default Loader;