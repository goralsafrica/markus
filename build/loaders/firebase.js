"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

var _nodePushNotificationsFirebaseAdminsdkSev23F0f7c3bc3b = _interopRequireDefault(require("../node-push-notifications-firebase-adminsdk-sev23-f0f7c3bc3b.json"));

var _default = function _default() {
  return new Promise(function (resolve, reject) {
    _firebaseAdmin["default"].initializeApp({
      credential: _firebaseAdmin["default"].credential.cert(_nodePushNotificationsFirebaseAdminsdkSev23F0f7c3bc3b["default"]),
      databaseURL: "https://node-push-notifications.firebaseio.com"
    });
  });
};

exports["default"] = _default;