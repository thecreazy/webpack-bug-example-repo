/* eslint-disable */

"use strict";

import from from "array.from";
import includes from "array-includes";

// Array includes polyfill
if (!Array.prototype.includes) {
  includes.shim();
}

// Array from polyfill
if (!Array.from) {
  from.shim();
}

// setImmediate polyfill
(function (global) {
  if (global.setImmediate) {
    return;
  }
  if (!process.browser) {
    if (typeof process.nextTick === "function") {
      global.setImmediate = (fn) => process.nextTick(fn);
    } else {
      global.setImmediate = (fn) => setTimeout(fn, 0);
    }
  } else if (typeof window !== "undefined") {
    window.setImmediate = (fn) => setTimeout(fn, 0);
  }
})(
  typeof self === "undefined"
    ? typeof global === "undefined"
      ? this
      : global
    : self
);

// Client side polyfills
if (process.browser) {
  // Custom event polyfill
  (function () {
    if (
      typeof window === "undefined" ||
      typeof window.CustomEvent === "function" ||
      typeof document === "undefined"
    )
      return false;

    function CustomEvent(event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined,
      };
      let evt = document.createEvent("CustomEvent");
      evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
      );
      return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
  })();

  if (typeof window !== "undefined") {
    // Element.matches() polyfill
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
          let matches = (this.document || this.ownerDocument).querySelectorAll(
              s
            ),
            i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1;
        };
    }
  }

  // On IE EventTarget is undefined
  if (typeof EventTarget !== "undefined" && typeof document !== "undefined") {
    (function () {
      let passiveEvents = ["scroll", "resize"];
      let super_add_event_listener = EventTarget.prototype.addEventListener;
      let super_remove_event_listener =
        EventTarget.prototype.removeEventListener;
      let super_prevent_default = Event.prototype.preventDefault;

      let supportsPassive = false;

      document.createElement("div").addEventListener("test", function () {}, {
        get passive() {
          supportsPassive = true;
          return false;
        },
      });

      const parseOptions = (type, listener, options, action) => {
        let needsWrapping = false;
        let useCapture = false;
        let passive = false;
        let fieldId;
        if (options) {
          if (typeof options === "object") {
            passive = !!options.passive;
            useCapture = !!options.useCapture;
          } else {
            useCapture = options;
          }
        }
        if (passive) needsWrapping = true;
        if (needsWrapping) {
          fieldId = useCapture.toString();
          fieldId += passive.toString();
        }
        action(needsWrapping, fieldId, useCapture, passive);
      };

      if (!supportsPassive) {
        Event.prototype.preventDefault = function () {
          if (this.__passive) {
            console.warn(
              "Ignored attempt to preventDefault an event from a passive listener"
            );
            return;
          }
          super_prevent_default.apply(this);
        };

        EventTarget.prototype.addEventListener = function (
          type,
          listener,
          options
        ) {
          let super_this = this;
          parseOptions(
            type,
            listener,
            options,
            function (needsWrapping, fieldId, useCapture, passive) {
              if (needsWrapping) {
                let fieldId = useCapture.toString();
                fieldId += passive.toString();

                if (!this.__event_listeners_options)
                  this.__event_listeners_options = {};
                if (!this.__event_listeners_options[type])
                  this.__event_listeners_options[type] = {};
                if (!this.__event_listeners_options[type][listener])
                  this.__event_listeners_options[type][listener] = [];
                if (this.__event_listeners_options[type][listener][fieldId])
                  return;
                let wrapped = {
                  handleEvent: function (e) {
                    e.__passive = passive;
                    if (typeof listener === "function") {
                      listener(e);
                    } else {
                      listener.handleEvent(e);
                    }
                    e.__passive = false;
                  },
                };
                this.__event_listeners_options[type][listener][
                  fieldId
                ] = wrapped;
                super_add_event_listener.call(
                  super_this,
                  type,
                  wrapped,
                  useCapture
                );
              } else {
                super_add_event_listener.call(
                  super_this,
                  type,
                  listener,
                  useCapture
                );
              }
            }
          );
        };

        EventTarget.prototype.removeEventListener = function (
          type,
          listener,
          options
        ) {
          let super_this = this;
          parseOptions(
            type,
            listener,
            options,
            function (needsWrapping, fieldId, useCapture, passive) {
              if (
                needsWrapping &&
                this.__event_listeners_options &&
                this.__event_listeners_options[type] &&
                this.__event_listeners_options[type][listener] &&
                this.__event_listeners_options[type][listener][fieldId]
              ) {
                super_remove_event_listener.call(
                  super_this,
                  type,
                  this.__event_listeners_options[type][listener][fieldId],
                  false
                );
                delete this.__event_listeners_options[type][listener][fieldId];
                if (this.__event_listeners_options[type][listener].length === 0)
                  delete this.__event_listeners_options[type][listener];
              } else {
                super_remove_event_listener.call(
                  super_this,
                  type,
                  listener,
                  useCapture
                );
              }
            }
          );
        };
      } else {
        // Default to options with passive set to true
        EventTarget.prototype.addEventListener = function (
          type,
          listener,
          options
        ) {
          if (passiveEvents.indexOf(type) !== -1) {
            options = { capture: true, once: false, passive: true };
          }
          super_add_event_listener.call(this, type, listener, options);
        };

        EventTarget.prototype.removeEventListener = function (
          type,
          listener,
          options
        ) {
          if (passiveEvents.indexOf(type) !== -1) {
            options = { capture: true, once: false, passive: true };
          }
          super_remove_event_listener.call(this, type, listener, options);
        };
      }
    })();
  }

  if (typeof window !== "undefined") {
    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame;
  }

  if (!Object.prototype.watch) {
    Object.defineProperty(Object.prototype, "watch", {
      enumerable: false,
      configurable: true,
      writable: false,
      value: function (prop, handler) {
        let oldval = this[prop],
          newval = oldval,
          getter = function () {
            return newval;
          },
          setter = function (val) {
            oldval = newval;
            //return newval = handler.call(this, prop, oldval, val);
            return (newval = handler.call(this, val));
          };

        if (delete this[prop]) {
          // can't watch constants
          Object.defineProperty(this, prop, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
          });
        }
      },
    });
  }

  if (!Object.prototype.unwatch) {
    Object.defineProperty(Object.prototype, "unwatch", {
      numerable: false,
      configurable: true,
      writable: false,
      value: function (prop) {
        let val = this[prop];
        delete this[prop]; // remove accessors
        this[prop] = val;
      },
    });
  }

  if (typeof window !== "undefined") {
    // Not an actual polyfill but more like a wrapper
    (function (w) {
      const active = {};

      const _setTimeout = w.setTimeout;
      const _clearTimeout = w.clearTimeout;

      w.setTimeout = function (fn, delay) {
        const id = _setTimeout(function () {
          fn();
          delete active[id];
        }, delay);
        active[id] = true;
        return id;
      };

      w.clearTimeout = function (id) {
        delete active[id];
        _clearTimeout(id);
      };

      // Use this to check what timers are still running
      w.activeTimers = function () {
        return active;
      };
    })(window);
  }
}
