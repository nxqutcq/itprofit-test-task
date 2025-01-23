const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/submit', (req, res) => {
  const { name, email, phone, message } = req.body

  if (!name || !email || !phone || !message) {
    return res.json({
      status: 'error',
      fields: {
        name: !name ? 'Поле имя обязательно' : null,
        email: !email ? 'Поле email обязательно' : null,
        phone: !phone ? 'Поле телефон обязательно' : null,
        message: !message ? 'Поле сообщение обязательно' : null,
      },
    })
  }

  return res.json({
    status: 'success',
    msg: 'Ваша заявка успешно отправлена',
  })
})

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000')
})
