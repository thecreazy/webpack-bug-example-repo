/* eslint-disable func-names */
import { cloneObjWorker } from "module-helpers/worker.helper";
import isObject from "module-helpers/functions/utils/isObject";

String.prototype.ucfirst = function () {
  if (!this) {
    return "";
  }
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.replaceAll = function (search, replacement) {
  const str = this;
  return str.replace(
    new RegExp(search.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"),
    replacement
  );
};

if (!Object.prototype.hasInPath) {
  Object.defineProperty(Object.prototype, "hasInPath", {
    enumerable: false,
    configurable: false,
    writable: false,
    value(searchKeyPath) {
      let v = this;

      if (typeof searchKeyPath === "string") {
        searchKeyPath = searchKeyPath.split(".");
      }

      for (let i = 0; i < searchKeyPath.length; i++) {
        if (
          !!v[searchKeyPath[i]] &&
          typeof v[searchKeyPath[i]] !== "undefined"
        ) {
          v = v[searchKeyPath[i]];
        } else {
          return false;
        }
      }
      return true;
    },
  });
}

if (!Object.prototype.getInPath) {
  Object.defineProperty(Object.prototype, "getInPath", {
    enumerable: false,
    configurable: false,
    writable: false,
    value(searchKeyPath) {
      let v = this;

      if (typeof searchKeyPath === "string") {
        searchKeyPath = searchKeyPath.split(".");
      }

      for (let i = 0; i < searchKeyPath.length; i++) {
        if (typeof v[searchKeyPath[i]] !== "undefined") {
          v = v[searchKeyPath[i]];
        } else {
          v = null;
          break;
        }
      }
      return v;
    },
  });
}

if (!Object.prototype.setInPath) {
  Object.defineProperty(Object.prototype, "setInPath", {
    enumerable: false,
    configurable: false,
    writable: false,
    value(searchKeyPath, value, { create = true, clone = true } = {}) {
      let currentObject = this;
      let property;

      while (searchKeyPath.length) {
        property = searchKeyPath.shift();

        if (!currentObject) break;

        if (!isObject(currentObject[property]) && create) {
          currentObject[property] = {};
        }

        if (!searchKeyPath.length) {
          if (clone) {
            currentObject[property] = cloneObjWorker(value);
          } else {
            currentObject[property] = value;
          }
        }
        currentObject = currentObject[property];
      }
    },
  });
}

if (!Object.prototype.mergeInPath) {
  Object.defineProperty(Object.prototype, "mergeInPath", {
    enumerable: false,
    configurable: false,
    writable: false,
    value(searchKeyPath, value, { create = true } = {}) {
      let currentObject = this;
      let property;

      while (searchKeyPath.length) {
        property = searchKeyPath.shift();

        if (!currentObject) break;

        if (!isObject(currentObject[property]) && create) {
          currentObject[property] = {};
        }

        if (!searchKeyPath.length) {
          currentObject[property] = {
            ...currentObject[property],
            ...value,
          };
        }

        currentObject = currentObject[property];
      }
    },
  });
}

if (!Object.prototype.equalsTo) {
  Object.defineProperty(Object.prototype, "equalsTo", {
    enumerable: false,
    configurable: false,
    writable: false,
    value(b) {
      if (isObject(this) && isObject(b)) {
        const sortedThis = Object.keys(this)
          .sort()
          .reduce((v, key) => {
            v[key] = this[key];
            return v;
          }, {});
        const sortedB = Object.keys(b)
          .sort()
          .reduce((v, key) => {
            v[key] = b[key];
            return v;
          }, {});
        return JSON.stringify(sortedThis) === JSON.stringify(sortedB);
      }
      if (Array.isArray(this) && Array.isArray(b)) {
        this.sort();
        b.sort();
      }
      return JSON.stringify(this) === JSON.stringify(b);
    },
  });
}

if (!Object.prototype.isSubset) {
  Object.defineProperty(Object.prototype, "isSubset", {
    enumerable: false,
    configurable: false,
    writable: false,
    value(b) {
      this.every((val) => b.includes(val));
    },
  });
}
