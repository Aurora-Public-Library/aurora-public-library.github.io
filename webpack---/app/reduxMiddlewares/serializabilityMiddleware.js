import { Iterable } from 'immutable';
import { createSerializableStateInvariantMiddleware, isPlain } from '@reduxjs/toolkit';

const isSerializable = value => Iterable.isIterable(value) || isPlain(value);
const getEntries = value => (Iterable.isIterable(value) ? value.entries() : Object.entries(value));

/*
 * Middleware that detects if any non-serializable values have been included in state or
 * dispatched actions. See: https://redux-toolkit.js.org/api/serializabilityMiddleware
 * This is particularly important because the state is serialized during serverside rendering,
 * and deserialized on page load. Also, any action that requires authentication may be serialized
 * in the `sessionStorage` during the login process, and needs to be completely serializable.
 */
const serializabilityMiddleware = createSerializableStateInvariantMiddleware({
  warnAfter: 1000,
  isSerializable,
  getEntries,

  // WARNING: Before adding any path here, be sure the value would never need to be serialized.
  ignoredActionPaths: ['meta.arg', 'payload.preLoginAction'],
  ignoredPaths: ['auth.preLoginAction']
});

export default serializabilityMiddleware;
