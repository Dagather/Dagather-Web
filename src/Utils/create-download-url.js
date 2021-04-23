import { storage } from 'Config/firebaseConfig';

const getStroage = () => storage();

const CDU = (path) => {
  if (path) {
    const rootRef = getStroage().ref();
    const fileRef = rootRef.child(path);
    fileRef.getDownloadURL().then((url) => {
      try {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = () => {
          const blob = xhr.response;
          const a = document.createElement('a');
          a.style = 'display: none';
          document.body.appendChild(a);
          a.href = window.URL.createObjectURL(blob);
          a.download = fileRef.name;
          a.click();
          window.URL.revokeObjectURL(url);
        };
        xhr.open('GET', url);
        xhr.send();
      } catch {
        // Deal with Error state
      }
    });
  }
};

export default CDU;
