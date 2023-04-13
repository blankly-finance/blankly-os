import postscribe from 'postscribe'

export default (context, inject) => {
  inject('postscribe', (elementId, scriptCode) => {
    postscribe(elementId, scriptCode)
  })
}
