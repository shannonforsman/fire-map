var register = document.getElementById('register')
var login = document.getElementById('login')


register.addEventListener('click', function() {
  var form = document.getElementById('register-form')
  form.innerHTML = '<form action="/register" method="post"><input type="email" name="email" value="" placeholder="email"><input type="password" name="password" value="" placeholder="password"><input type="submit" value="register"></form>'
  register.style.display = 'none'
  login.style.display = 'none'
})
