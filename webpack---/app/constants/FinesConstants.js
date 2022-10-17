import { createReduxConstants } from '@bibliocommons/utils-redux';

export const PAYPAL_SDK_SRC = 'https://www.paypal.com/sdk/js';
export const PAYPAL_INTEGRATION_DATE = '2019-08-31';

export default createReduxConstants('FINES', {
  FETCH_FINES_REQUEST: null,
  FETCH_FINES_SUCCESS: null,
  FETCH_FINES_FAILURE: null,
  FETCH_FINES_PAYMENT_FORM_REQUEST: null,
  FETCH_FINES_PAYMENT_FORM_FAILURE: null,
  FETCH_FINES_PAYMENT_FORM_SUCCESS: null,
  EMPTY_FINES_PAYMENT: null,
  UPDATE_PAGE_REQUEST: null,
  UPDATE_PAGE_SUCCESS: null,
  UPDATE_PAGE_FAILURE: null,
  CREATE_ORDER_REQUEST: null,
  CREATE_ORDER_SUCCESS: null,
  CREATE_ORDER_FAILURE: null,
  CREATE_PAYMENT_REQUEST: null,
  CREATE_PAYMENT_SUCCESS: null,
  CREATE_PAYMENT_FAILURE: null,
  CLEAR_FINES_TRANSACTION: null
});
