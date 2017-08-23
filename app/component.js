// import styles from './main.css';

export default (text = 'Hello world') => {
  const element = document.createElement('div');

  element.innerHTML = text;
  // this would add a generated class name if css modules were being used
  // element.className = styles.redButton;

  element.className = 'redButton';

  return element;
};