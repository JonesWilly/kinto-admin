import { expect } from "chai";
import sinon from "sinon";

import { SESSION_SERVERINFO_SUCCESS } from "../../scripts/constants";
// const routeSagas = require("../../scripts/sagas/route");
const sessionSagas = require("../../scripts/sagas/session");
const bucketSagas = require("../../scripts/sagas/bucket");
const collectionSagas = require("../../scripts/sagas/collection");
import configureStore from "../../scripts/store/configureStore";

import * as sessionActions from "../../scripts/actions/session";
import * as bucketActions from "../../scripts/actions/bucket";


function expectSagaCalled(saga, action) {
  // Note: the rootSaga function is called by configureStore
  configureStore().dispatch(action);

  expect(saga.firstCall.args[0].name).eql("bound getState");
  expect(saga.firstCall.args[1]).eql(action);
}

describe("root saga", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("Session watchers registration", () => {
    it("should watch for the setup action", () => {
      const saga = sandbox.stub(sessionSagas, "setupSession");
      const action = sessionActions.setup();

      expectSagaCalled(saga, action);
    });

    it("should watch for the listBuckets action", () => {
      const saga = sandbox.stub(sessionSagas, "listBuckets");
      const action = sessionActions.listBuckets();

      expectSagaCalled(saga, action);
    });

    it("should watch for the setupComplete action", () => {
      const saga = sandbox.stub(sessionSagas, "handleSessionRedirect");
      const action = sessionActions.setupComplete();

      expectSagaCalled(saga, action);
    });
  });

  describe("Bucket watchers registration", () => {
    it("should watch for the createBucket action", () => {
      const saga = sandbox.stub(bucketSagas, "createBucket");
      const action = bucketActions.createBucket();

      expectSagaCalled(saga, action);
    });

    it("should watch for the updateBucket action", () => {
      const saga = sandbox.stub(bucketSagas, "updateBucket");
      const action = bucketActions.updateBucket();

      expectSagaCalled(saga, action);
    });

    it("should watch for the deleteBucket action", () => {
      const saga = sandbox.stub(bucketSagas, "deleteBucket");
      const action = bucketActions.deleteBucket();

      expectSagaCalled(saga, action);
    });

    it("should watch for the createCollection action", () => {
      const saga = sandbox.stub(bucketSagas, "createCollection");
      const action = bucketActions.createCollection();

      expectSagaCalled(saga, action);
    });

    it("should watch for the updateCollection action", () => {
      const saga = sandbox.stub(bucketSagas, "updateCollection");
      const action = bucketActions.updateCollection();

      expectSagaCalled(saga, action);
    });

    it("should watch for the deleteCollection action", () => {
      const saga = sandbox.stub(bucketSagas, "deleteCollection");
      const action = bucketActions.deleteCollection();

      expectSagaCalled(saga, action);
    });
  });

  describe("Conditional watchers", () => {
    it("should reset the watchRecordCreate watcher on new session info", () => {
      const watchRecordCreate = sandbox.stub(collectionSagas, "watchRecordCreate");
      const store = configureStore();
      const action = {type: SESSION_SERVERINFO_SUCCESS};

      store.dispatch(action);

      sinon.assert.calledWithExactly(watchRecordCreate, action);
    });
  });
});