/** @jsx jsx */
import { jsx, Link as Lstyle } from 'theme-ui'
/* globals window */
import React, { useEffect, useState } from 'react'
import {FirebaseAuth} from 'react-firebaseui-cs'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '../utils/auth/initFirebase'
import { useApolloClient } from "@apollo/react-hooks"
import { Flex, Box } from 'reflexbox'

// Init the Firebase app.
// initFirebase()
firebase.auth().languageCode = 'cs'
let auth = firebase.auth()
// auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)

const firebaseAuthConfig = {
  signInFlow: 'popup',
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
      requireDisplayName: false,
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  signInSuccessUrl: '/',
  credentialHelper: 'none',
}

function MyFirebaseAuth() {
  return (
    <Flex>
      <Box
        sx={{
          maxWidth: 400,
          width: '100%',
          mx: 'auto',
          px: 3
        }}>
      <FirebaseAuth
        uiConfig={firebaseAuthConfig}
        firebaseAuth={auth}
      />
      </Box>
      <style jsx global>{`
      .firebaseui-idp-password .firebaseui-idp-text-long {
          font-size: 0;
      }
        .firebaseui-idp-password .firebaseui-idp-text-long:after {
            visibility: visible;
            content: 'Pokračovat pomocí e-mailu';
            font-size: 14px;
            text-align: center;
        }
        .firebaseui-button {
          box-sizing: border-box;
          min-width: 0px;
          -webkit-appearance: none;
          display: inline-block;
          text-align: center;
          line-height: inherit;
          font-size: 14;
          padding-left: 16px;
          padding-right: 16px;
          padding-top: 8px;
          padding-bottom: 8px;
          font-weight: 600;
          margin: 0px;
          text-decoration: none;
          border-width: 0px;
          border-style: initial;
          border-color: initial;
          border-image: initial;
          border-radius: 4px;
        }
        .firebaseui-form-actions {
          text-align: right;
        }
        .firebaseui-id-submit {
          color: #ffffff;
          background-color: #111199;
        }
        h1.firebaseui-title {
          box-sizing: border-box;
          min-width: 0px;
          font-family: inherit;
          font-weight: 800;
          line-height: 1.25;
          margin: 0px;
          font-size: 1.5em;
          margin-block-start: 0.83em;
          margin-block-end: 0.83em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
        }
        .firebaseui-label {
          box-sizing: border-box;
          min-width: 0px;
          width: 100%;
          display: flex;
          font-size: 14px;
          font-weight: 700;
          margin: 0px;
        }
        .firebaseui-idp-icon-wrapper {
            border-radius: 3px;
            width: 32px;
            height: 32px;
            position: absolute;
            left: 10px;
            bottom: 2px;
            float: left;
        }
        .firebaseui-idp-icon {
            height: 22px;
            margin-bottom: 0px;
        }
        .firebaseui-idp-list {
          list-style: none;
          padding: 0;
        }
        .firebaseui-idp-text-short {
          display: none;
        }
        .firebaseui-list-item {
          display: block;
          margin-bottom: .4em;
        }
        .firebaseui-idp-google {
            background-color: #fff!important;
            color: rgba(0, 0, 0, 0.54)!important;
            border: 1px solid #92929285!important;
            padding-top: 11px!important;
        }
        .firebaseui-idp-button {
          box-sizing: border-box;
          min-width: 0px;
          width: 100%;
          -webkit-appearance: none;
          display: inline-block;
          text-align: center;
          line-height: inherit;
          font-size: inherit;
          padding-left: 16px;
          padding-right: 16px;
          padding-top: 12px;
          padding-bottom: 12px;
          color: #fff;
          background-color: #fff;
          font-weight: 600;
          position: relative;
          margin: 0px;
          text-decoration: none;
          border-width: 0px;
          border-style: initial;
          border-color: initial;
          border-image: initial;
          border-radius: 4px;
        }
        .mdl-textfield__input {
          box-sizing: border-box;
          min-width: 0px;
          display: block;
          width: 100%;
          -webkit-appearance: none;
          font-size: inherit;
          line-height: inherit;
          color: inherit;
          background-color: transparent;
          margin: 0px;
          padding: 8px;
          border-width: 1px;
          border-style: solid;
          border-image: initial;
          border-radius: 4px;
        }
        .firebaseui-input {
          border-color: #777;
        }
        .firebaseui-input:focus {
          border-color: #3333ee;
          box-shadow: 0 0 0 2px #3333ee;
          outline: none;
        }
        .firebaseui-email-sent {
          background-image: url(https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/success_status.png);
          background-position: center;
          background-repeat: no-repeat;
          background-size: 64px 64px;
          height: 64px;
          margin-top: 16px;
          text-align: center;
        }
        .mdl-progress.firebaseui-busy-indicator {
          height: 2px;
          left: 0;
          position: absolute;
          top: 55px;
          width: 100%}
        .mdl-spinner.firebaseui-busy-indicator {
            height: 56px;
            left: 0px;
            margin: auto;
            position: absolute;
            right: 0px;
            top: 30%;
            width: 56px;
        }
        .firebaseui-callback-indicator-container .firebaseui-busy-indicator {
            top: 0px;
        }
        .firebaseui-callback-indicator-container {
            height: 120px;
        }
        .firebaseui-info-bar {
          border: 0;
          border-radius: 10px;
          left: 5%;
          right: 5%;
          top: 10%;
          bottom: 10%;
        }
        .firebaseui-form-links {
          display: table-cell;
          vertical-align: middle;
          width: 100%
        }
        .firebaseui-text {
          color: rgba(0, 0, 0, 0.87);
          direction: ltr;
          font-size: 16px;
          line-height: 24px;
          text-align: left;
        }
        .mdl-card {
          position: relative;
        }
        .mdl-progress.firebaseui-busy-indicator {
          height: 2px;
          left: 0;
          position: absolute;
          top: 55px;
          width: 100%}
      .mdl-spinner.firebaseui-busy-indicator {
          height: 56px;
          left: 0px;
          margin: auto;
          position: absolute;
          right: 0px;
          top: 30%;
          width: 56px;
      }
        .firebaseui-text-input-error {
          color: #dd2c00;
          font-size: 14px;
        }
        .firebaseui-input-invalid {
          border-color: #dd2c00;
        }
        .firebaseui-input-invalid:focus {
          outline: none;
          box-shadow: 0 0 0 2px #dd2c00;
          border-color: #dd2c00;
        }
        .mdl-progress {
          display: block;
          position: relative;
          height: 4px;
          width: 500px;
          max-width: 100%}
      .mdl-progress>.bar {
          display: block;
          position: absolute;
          top: 0;
          bottom: 0;
          width: 0%;
          transition: width .2s cubic-bezier(0.4,  0,  0.2,  1);
      }
      .mdl-progress>.progressbar {
          background-color: rgb(63, 81, 181);
          z-index: 1;
          left: 0;
      }
      .mdl-progress>.bufferbar {
          background-image: linear-gradient(to right,  rgba(255, 255, 255,  0.7),  rgba(255, 255, 255,  0.7)), linear-gradient(to right,  rgb(63, 81, 181),  rgb(63, 81, 181));
          z-index: 0;
          left: 0;
      }
      .mdl-progress>.auxbar {
          right: 0;
      }
      @supports(-webkit-appearance: none) {
          .mdl-progress: not(.mdl-progress--indeterminate):not(.mdl-progress--indeterminate)>.auxbar, .mdl-progress:not(.mdl-progress__indeterminate):not(.mdl-progress__indeterminate)>.auxbar {
          background-image: linear-gradient(to right,  rgba(255, 255, 255,  0.7),  rgba(255, 255, 255,  0.7)), linear-gradient(to right,  rgb(63, 81, 181),  rgb(63, 81, 181));
          mask: url("data:image/svg+xml;
          base64, PD94bWwgdmVyc2lvbj0iMS4wIj8+Cjxzdmcgd2lkdGg9IjEyIiBoZWlnaHQ9IjQiIHZpZXdQb3J0PSIwIDAgMTIgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxlbGxpcHNlIGN4PSIyIiBjeT0iMiIgcng9IjIiIHJ5PSIyIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiBmcm9tPSIyIiB0bz0iLTEwIiBkdXI9IjAuNnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogIDwvZWxsaXBzZT4KICA8ZWxsaXBzZSBjeD0iMTQiIGN5PSIyIiByeD0iMiIgcnk9IjIiIGNsYXNzPSJsb2FkZXIiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iY3giIGZyb209IjE0IiB0bz0iMiIgZHVyPSIwLjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4KICA8L2VsbGlwc2U+Cjwvc3ZnPgo=");
      }
      }.mdl-progress: not(.mdl-progress--indeterminate)>.auxbar, .mdl-progress:not(.mdl-progress__indeterminate)>.auxbar {
          background-image: linear-gradient(to right,  rgba(255, 255, 255,  0.9),  rgba(255, 255, 255,  0.9)), linear-gradient(to right,  rgb(63, 81, 181),  rgb(63, 81, 181));
      }
      .mdl-progress.mdl-progress--indeterminate>.bar1, .mdl-progress.mdl-progress__indeterminate>.bar1 {
          background-color: rgb(63, 81, 181);
          animation-name: indeterminate1;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
      }
      .mdl-progress.mdl-progress--indeterminate>.bar3, .mdl-progress.mdl-progress__indeterminate>.bar3 {
          background-image: none;
          background-color: rgb(63, 81, 181);
          animation-name: indeterminate2;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
      }
      @keyframes indeterminate1 {
          0% {
          left: 0%;
          width: 0%}
      50% {
          left: 25%;
          width: 75%}
      75% {
          left: 100%;
          width: 0%}
      }@keyframes indeterminate2 {
          0% {
          left: 0%;
          width: 0%}
      50% {
          left: 0%;
          width: 0%}
      75% {
          left: 0%;
          width: 25%}
      100% {
          left: 100%;
          width: 0%}
      }
      .mdl-spinner {
          display: inline-block;
          position: relative;
          width: 28px;
          height: 28px;
      }
      .firebaseui-info-bar {
        background-color: #f9edbe;
        border: 1px solid #f0c36d;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        left: 10%;
        padding: 8px 16px;
        position: absolute;
        right: 10%;
        text-align: center;
        top: 0;
    }
    .firebaseui-info-bar-message {
        font-size: 12px;
        margin: 0;
    }
    .firebaseui-dialog {
        box-sizing: border-box;
        color: rgba(0, 0, 0, 0.87);
        height: auto;
        padding: 24px;
        text-align: left;
    }
    .firebaseui-dialog-icon-wrapper {
        display: table-cell;
        vertical-align: middle;
    }
    .firebaseui-dialog-icon {
        float: left;
        height: 40px;
        margin-right: 24px;
        width: 40px;
    }
    .firebaseui-progress-dialog-message {
        display: table-cell;
        font-size: 16px;
        font-weight: 400;
        min-height: 40px;
        vertical-align: middle;
    }
    .firebaseui-progress-dialog-loading-icon {
        height: 28px;
        margin: 6px 30px 6px 6px;
        width: 28px;
    }
    .firebaseui-icon-done {
        background-image: url("https://www.gstatic.com/images/icons/material/system/2x/done_googgreen_36dp.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 36px 36px;
    }
      .mdl-spinner:not(.is-upgraded).is-active:after {
          content: "Loading..."}
      .mdl-spinner.is-upgraded.is-active {
          animation: mdl-spinner__container-rotate 1568.2352941176ms linear infinite;
      }
      @keyframes mdl-spinner__container-rotate {
          to {
          transform: rotate(360deg);
      }
      }.mdl-spinner__layer {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
      }
      .mdl-spinner__layer-1 {
          border-color: rgb(66, 165, 245);
      }
      .mdl-spinner--single-color .mdl-spinner__layer-1 {
          border-color: rgb(63, 81, 181);
      }
      .mdl-spinner.is-active .mdl-spinner__layer-1 {
          animation: mdl-spinner__fill-unfill-rotate 5332ms cubic-bezier(0.4,  0,  0.2,  1) infinite both, mdl-spinner__layer-1-fade-in-out 5332ms cubic-bezier(0.4,  0,  0.2,  1) infinite both;
      }
      .mdl-spinner__layer-2 {
          border-color: rgb(244, 67, 54);
      }
      .mdl-spinner--single-color .mdl-spinner__layer-2 {
          border-color: rgb(63, 81, 181);
      }
      .mdl-spinner.is-active .mdl-spinner__layer-2 {
          animation: mdl-spinner__fill-unfill-rotate 5332ms cubic-bezier(0.4,  0,  0.2,  1) infinite both, mdl-spinner__layer-2-fade-in-out 5332ms cubic-bezier(0.4,  0,  0.2,  1) infinite both;
      }
      .mdl-spinner__layer-3 {
          border-color: rgb(253, 216, 53);
      }
      .mdl-spinner--single-color .mdl-spinner__layer-3 {
          border-color: rgb(63, 81, 181);
      }
      .mdl-spinner.is-active .mdl-spinner__layer-3 {
          animation: mdl-spinner__fill-unfill-rotate 5332ms cubic-bezier(0.4,  0,  0.2,  1) infinite both, mdl-spinner__layer-3-fade-in-out 5332ms cubic-bezier(0.4,  0,  0.2,  1) infinite both;
      }
      .mdl-spinner__layer-4 {
          border-color: rgb(76, 175, 80);
      }
      .mdl-spinner--single-color .mdl-spinner__layer-4 {
          border-color: rgb(63, 81, 181);
      }
      .mdl-spinner.is-active .mdl-spinner__layer-4 {
          animation: mdl-spinner__fill-unfill-rotate 5332ms cubic-bezier(0.4,  0,  0.2,  1) infinite both, mdl-spinner__layer-4-fade-in-out 5332ms cubic-bezier(0.4,  0,  0.2,  1) infinite both;
      }
      @keyframes mdl-spinner__fill-unfill-rotate {
          12.5% {
          transform: rotate(135deg);
      }
      25% {
          transform: rotate(270deg);
      }
      37.5% {
          transform: rotate(405deg);
      }
      50% {
          transform: rotate(540deg);
      }
      62.5% {
          transform: rotate(675deg);
      }
      75% {
          transform: rotate(810deg);
      }
      87.5% {
          transform: rotate(945deg);
      }
      to {
          transform: rotate(1080deg);
      }
      }@keyframes mdl-spinner__layer-1-fade-in-out {
          from {
          opacity: .99;
      }
      25% {
          opacity: .99;
      }
      26% {
          opacity: 0;
      }
      89% {
          opacity: 0;
      }
      90% {
          opacity: .99;
      }
      100% {
          opacity: .99;
      }
      }@keyframes mdl-spinner__layer-2-fade-in-out {
          from {
          opacity: 0;
      }
      15% {
          opacity: 0;
      }
      25% {
          opacity: .99;
      }
      50% {
          opacity: .99;
      }
      51% {
          opacity: 0;
      }
      }@keyframes mdl-spinner__layer-3-fade-in-out {
          from {
          opacity: 0;
      }
      40% {
          opacity: 0;
      }
      50% {
          opacity: .99;
      }
      75% {
          opacity: .99;
      }
      76% {
          opacity: 0;
      }
      }@keyframes mdl-spinner__layer-4-fade-in-out {
          from {
          opacity: 0;
      }
      65% {
          opacity: 0;
      }
      75% {
          opacity: .99;
      }
      90% {
          opacity: .99;
      }
      100% {
          opacity: 0;
      }
      }.mdl-spinner__gap-patch {
          position: absolute;
          box-sizing: border-box;
          top: 0;
          left: 45%;
          width: 10%;
          height: 100%;
          overflow: hidden;
          border-color: inherit;
      }
      .mdl-spinner__gap-patch .mdl-spinner__circle {
          width: 1000%;
          left: -450%}
      .mdl-spinner__circle-clipper {
          display: inline-block;
          position: relative;
          width: 50%;
          height: 100%;
          overflow: hidden;
          border-color: inherit;
      }
      .mdl-spinner__circle-clipper.mdl-spinner__left {
          float: left;
      }
      .mdl-spinner__circle-clipper.mdl-spinner__right {
          float: right;
      }
      .mdl-spinner__circle-clipper .mdl-spinner__circle {
          width: 200%}
      .mdl-spinner__circle {
          box-sizing: border-box;
          height: 100%;
          border-width: 3px;
          border-style: solid;
          border-color: inherit;
          border-bottom-color: transparent !important;
          border-radius: 50%;
          animation: none;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
      }
      .mdl-spinner__left .mdl-spinner__circle {
          border-right-color: transparent !important;
          transform: rotate(129deg);
      }
      .mdl-spinner.is-active .mdl-spinner__left .mdl-spinner__circle {
          animation: mdl-spinner__left-spin 1333ms cubic-bezier(0.4,  0,  0.2,  1) infinite both;
      }
      .mdl-spinner__right .mdl-spinner__circle {
          left: -100%;
          border-left-color: transparent !important;
          transform: rotate(-129deg);
      }
      .mdl-spinner.is-active .mdl-spinner__right .mdl-spinner__circle {
          animation: mdl-spinner__right-spin 1333ms cubic-bezier(0.4,  0,  0.2,  1) infinite both;
      }
      @keyframes mdl-spinner__left-spin {
          from {
          transform: rotate(130deg);
      }
      50% {
          transform: rotate(-5deg);
      }
      to {
          transform: rotate(130deg);
      }
      }@keyframes mdl-spinner__right-spin {
          from {
          transform: rotate(-130deg);
      }
      50% {
          transform: rotate(5deg);
      }
      to {
          transform: rotate(-130deg);
      }
      }
      `}</style>
    </Flex>
  )
}

export default MyFirebaseAuth