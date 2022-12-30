export const localStorageCache = {
  set(name, data, expire) {
    const storeData = {
      data,
      expire,
    };
    localStorage && localStorage.setItem(name, JSON.stringify(storeData));
  },

  get(queryKey) {
    const storeData =
      localStorage && JSON.parse(localStorage.getItem(queryKey));

    if (storeData) {
      const now = Date.now();

      if (storeData.expire && storeData.expire - now < 0) {
        return;
      }

      return storeData?.data;
    }
    return;
  },

  remove(queryKey) {
    if (queryKey) localStorage && localStorage.removeItem(queryKey);
  },
};

export const sessionStorageCache = {
  set(name, data, expire) {
    const storeData = {
      data,
      expire,
    };
    sessionStorage && sessionStorage.setItem(name, JSON.stringify(storeData));
  },

  get(queryKey) {
    const storeData =
      sessionStorage && JSON.parse(sessionStorage.getItem(queryKey));

    if (storeData) {
      const now = Date.now();

      if (storeData.expire && storeData.expire - now < 0) {
        return;
      }

      return storeData?.data;
    }
    return;
  },

  remove(queryKey) {
    if (queryKey) sessionStorage && sessionStorage.removeItem(queryKey);
  },
};
