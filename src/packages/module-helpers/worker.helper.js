export const cloneObjWorker = (json) => {
  return parseJSON(stringifyJSON(json));
};
