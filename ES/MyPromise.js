const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach(callback => callback(value));
      }
    };

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(callback => callback(reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    const promise2 = new MyPromise((resolve, reject) => {
      const handleFulfilled = () => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      };

      const handleRejected = () => {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      };

      if (this.status === FULFILLED) {
        handleFulfilled();
      } else if (this.status === REJECTED) {
        handleRejected();
      } else {
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });

    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(callback) {
    return this.then(
      value => MyPromise.resolve(callback()).then(() => value),
      reason => MyPromise.resolve(callback()).then(() => { throw reason })
    );
  }

  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise'));
    }

    if (x instanceof MyPromise) {
      x.then(resolve, reject);
    } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      let called = false;
      try {
        const then = x.then;
        if (typeof then === 'function') {
          then.call(
            x,
            (y) => {
              if (called) return;
              called = true;
              this.resolvePromise(promise2, y, resolve, reject);
            },
            (r) => {
              if (called) return;
              called = true;
              reject(r);
            }
          );
        } else {
          resolve(x);
        }
      } catch (error) {
        if (called) return;
        called = true;
        reject(error);
      }
    } else {
      resolve(x);
    }
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise(resolve => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }

  static all(promises) {
    if (!Array.isArray(promises)) {
      return MyPromise.reject(new TypeError('Promise.all() expects an array'));
    }

    return new MyPromise((resolve, reject) => {
      const results = [];
      let completedCount = 0;
      const length = promises.length;

      if (length === 0) {
        return resolve(results);
      }

      const processResult = (index, value) => {
        results[index] = value;
        completedCount++;
        if (completedCount === length) {
          resolve(results);
        }
      };

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          value => processResult(index, value),
          reason => reject(reason)
        );
      });
    });
  }

  static race(promises) {
    if (!Array.isArray(promises)) {
      return MyPromise.reject(new TypeError('Promise.race() expects an array'));
    }

    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        MyPromise.resolve(promise).then(resolve, reject);
      });
    });
  }

  static allSettled(promises) {
    if (!Array.isArray(promises)) {
      return MyPromise.resolve([]);
    }

    return new MyPromise(resolve => {
      const results = [];
      let completedCount = 0;
      const length = promises.length;

      if (length === 0) {
        return resolve(results);
      }

      const processResult = (index, status, valueOrReason) => {
        results[index] = { status, [status === 'fulfilled' ? 'value' : 'reason']: valueOrReason };
        completedCount++;
        if (completedCount === length) {
          resolve(results);
        }
      };

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          value => processResult(index, 'fulfilled', value),
          reason => processResult(index, 'rejected', reason)
        );
      });
    });
  }

  static any(promises) {
    if (!Array.isArray(promises)) {
      return MyPromise.reject(new TypeError('Promise.any() expects an array'));
    }

    return new MyPromise((resolve, reject) => {
      let rejectedCount = 0;
      const length = promises.length;
      const errors = [];

      if (length === 0) {
        return reject(new AggregateError(['All promises were rejected'], 'All promises rejected'));
      }

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          value => resolve(value),
          reason => {
            errors[index] = reason;
            rejectedCount++;
            if (rejectedCount === length) {
              reject(new AggregateError(errors, 'All promises were rejected'));
            }
          }
        );
      });
    });
  }
}

Object.defineProperty(MyPromise.prototype, Symbol.toStringTag, {
  value: 'Promise',
  writable: false,
  enumerable: false,
  configurable: true
});

if (typeof window !== 'undefined') {
  window.MyPromise = MyPromise;
}

module.exports = MyPromise;