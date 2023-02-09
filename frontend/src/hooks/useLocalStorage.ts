import swal from 'sweetalert';

function useLocalStorage(
  method: 'add' | 'get' | 'remove',
  key: string,
  value?: string | object
): any {
  if (typeof Storage === 'undefined') {
    swal({
      icon: 'error',
      title: "Oops! Something's wrong",
      text: "Your browser doesn't support web storage",
    });
    return;
  } else {
    if (method === 'add') {
      const convertedToJSON = JSON.stringify(value);
      localStorage.setItem(key, convertedToJSON);
    }

    if (method === 'get') {
      const value = localStorage.getItem(key);
      if (value) {
        return value;
      }
    }

    if (method === 'remove') {
      localStorage.removeItem(key);
    }
  }
}

export default useLocalStorage;
