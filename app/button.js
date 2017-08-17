export default (text = 'Green Button') => {
  const button = document.createElement('div');
  button.innerHTML = text;
  button.className = 'greenButton';

  return button;
};