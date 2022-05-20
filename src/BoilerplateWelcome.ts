import './BoilerplateWelcome.css'

export default ({ title = 'Hello!' } = {}) => {
  const div = document.createElement('div')
  div.classList.add('boilerplate-welcome')

  const h1 = document.createElement('h1')
  const para = document.createElement('p')

  h1.textContent = title
  para.textContent =
    'This is a simple boilerplate for TS Frontend with webpack. It may be altered and expanded upon in the future!'

  div.append(h1, para)

  return div
}
