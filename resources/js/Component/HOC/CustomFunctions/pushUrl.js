export function pushUrl(props, pathname, state, search, hash) {
  props["history"].push({
    pathname,
    state: {
      prevUrl: `${props.match.url}${window.location.search}`,
      ...state,
    },
    search,
    hash,
  });
}

export function replaceUrl(props, pathname, state, search, hash) {
  props["history"].replace({
    pathname,
    state: {
      prevUrl: `${props.match.url}${window.location.search}`,
      ...state,
    },
    search,
    hash,
  });
}

//this will not effect on history.location.search
export function windowUrl(url, state) {
  window.history.pushState(
    {
      prevUrl: `${window.location.pathname}${window.location.search}`,
      ...state,
    },
    null,
    url
  );
}

export function windowReplaceUrl(url, state) {
  window.history.replaceState(
    {
      prevUrl: `${window.location.pathname}${window.location.search}`,
      ...state,
    },
    null,
    url
  );
}
