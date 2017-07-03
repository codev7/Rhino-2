import { all, fork, take, select, put } from 'redux-saga/effects';
import { isEmpty, pick } from 'lodash';
import { formValueSelector, touch } from 'redux-form';
import { push } from 'react-router-redux';

import simpleObjectDiff from 'src/helpers/simpleObjectDiff';

import { createClient, deleteClient, editClient } from './actions';
import { getCurrentClient } from './selectors';

import * as c from './constants';

function* newClientFormChange() {
  while (true) {
    yield take(c.NEW_CLIENT_FORM_CHANGE);
    const state = yield select();
    const { values, syncErrors } = state.form.newClientForm;

    if (isEmpty(syncErrors)) {
      yield put(createClient({
        commit: true,
        ...values,
      }));
    }
  }
}

function* editClientFormChange() {
  while (true) {
    const { id } = yield take(c.EDIT_CLIENT_FORM_CHANGE);
    const state = yield select();
    const { values, syncErrors, registeredFields } = state.form.editClientForm;
    const client = yield select(getCurrentClient);

      // since we put entire client to reduxForm using initialValues
      // we need to extract only those properties which are rendered on the page
      const keys = Object.keys(registeredFields);
      const diff = simpleObjectDiff(pick(values, keys), client);

      if (!isEmpty(diff)) {
        yield put(editClient(id, {
          commit: true,
          ...diff,
        }));
      }
  }
}


function* createClientSuccess() {
  while (true) {
    const { response } = yield take(c.CREATE_CLIENT_SUCCESS);
    const { id } = response.data.client;

    yield put(push(`/clients/${id}`));
  }
}

function* deleteClientTrigger() {
  while (true) {
    const { id } = yield take(c.DELETE_CLIENT_TRIGGER);

    if (confirm('Are you sure want to delete the client')) {
      yield put(deleteClient(id));
    }
  }
}

function* deleteClientSuccess() {
  while (true) {
    const { id } = yield take(c.DELETE_CLIENT_SUCCESS);

    yield put(push('/clients'));
  }
}

export default function* createSaga() {
  yield all([
    fork(newClientFormChange),
    fork(editClientFormChange),
    fork(createClientSuccess),
    fork(deleteClientTrigger),
    fork(deleteClientSuccess),
  ]);
}
