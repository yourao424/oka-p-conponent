<template>
  <div id="login">
    <div class="row">
      <div class="input-field col s12">
        <input id="email" type="email" class="validate" v-model="loginEmail">
        <label for="email">Email</label>
      </div>
    </div>
    <div class="center">
      <button
        @click="login"
        id="login-btn"
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
  name: 'Login',
  data () {
    return {
      loginEmail: ''
    }
  },
  methods: {
    /* eslint-disable no-unused-vars */
    login: function () {
      const actionCodeSettings = {
        url: window.location.href, // メールリンクのリダイレクト先
        handleCodeInApp: true
      }
      const db = firebase.firestore()
      const collection = db.collection('user') // firestoreのcollection設定

      $('#login-btn').addClass('disabled')
      // ログイン処理
      var query = collection.where('email', '==', this.loginEmail)
      query.get().then(snapshot => {
        if (!snapshot.empty) {
          snapshot.forEach(doc => {
            // メールを送る処理
            firebase
              .auth()
              .sendSignInLinkToEmail(this.loginEmail, actionCodeSettings)
              .then(
                function () {
                  // Toastに直す予定
                  alert(
                    'Welcome back ' +
                      doc.data().name +
                      '! An email was sent to ' +
                      doc.data().email +
                      '. Please use the link in the email to sign-in. Enjoy!'
                  )
                }
              )
              .catch(function (error) {
                var errorCode = error.code
                var errorMessage = error.message
                this.handleError(error) // エラー時の処理
              })
          })
        } else {
          alert('Your an email is not existed')
          $('#login-btn').removeClass('disabled')
        }
      })
    }
  }
}

/**
 * エラー処理
 * @param {*} error
 */
function handleError (error) {
  alert('ErrorCode: ' + error.code)
  console.log('ErrorMessage: ' + error.message)
  $('#login-btn').removeClass('disabled')
  $('#signup-btn').removeClass('disabled')
}

/* eslint-enable no-unused-vars */

</script>
