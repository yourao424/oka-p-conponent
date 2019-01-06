<template>
  <div id="signup">
    <div class="row">
      <div class="input-field col s12">
        <input placeholder="your name" id="first_name" type="text" class="validate" v-model="name">
        <label for="first_name">First Name</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <input id="email" type="email" class="validate" v-model="signupEmail">
        <label for="email">Email</label>
      </div>
    </div>
    <div class="center">
      <button
        @click="signup"
        id="signup-btn"
        class="btn-flat waves-effect waves-light"
        type="submit"
        name="action"
      >Login</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Signup',
  data () {
    return {
      signupEmail: '',
      name: ''
    }
  },
  methods: {
    signup: function () {
      /* eslint-disable no-unused-vars */
      const actionCodeSettings = {
        url: window.location.href, // メールリンクのリダイレクト先
        handleCodeInApp: true
      }
      const db = firebase.firestore()
      const collection = db.collection('user') // firestoreのcollection設定

      $('#signup-btn').addClass('disabled')
      // サインイン処理
      if (firebase.auth().currentUser) {
        firebase
          .auth()
          .signOut() // サインアウト処理
          .catch(function (error) {
            var errorCode = error.code
            var errorMessage = error.message
            this.handleError(error) // エラー時の処理
          })
      } else {
        // 登録処理
        collection
          .add({
            email: this.signupEmail,
            name: this.name
          })
          .then(function () {
            console.log('saved!')
          })
          .catch(function (error) {
            console.log('Error! : ', error)
          })

        // メールを送る処理
        firebase
          .auth()
          .sendSignInLinkToEmail(this.signupEmail, actionCodeSettings)
          .then(
            function () {
              window.localStorage.setItem('emailForSignIn', this.signupEmail)
              // Toastに直す予定
              alert(
                'Hello! ' +
                  this.name +
                  '. An email was sent to ' +
                  this.signupEmail +
                  '. Please use the link in the email to sign-in. Enjoy!'
              )
            }.bind(this)
          )
          .catch(function (error) {
            var errorCode = error.code
            var errorMessage = error.message
            this.handleError(error) // エラー時の処理
          })
      }
    }
  }
}

/**
 * エラー処理
 * @param {*} error
 */
function handleError (error) {
  alert('Error: ' + error.message)
  console.log(error)
  $('#login-btn').removeClass('disabled')
  $('#signup-btn').removeClass('disabled')
}
/* eslint-enable no-unused-vars */
</script>
