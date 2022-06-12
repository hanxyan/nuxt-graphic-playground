
/**
 * window event listener controller
 * 
 */
export class mEventListener {
  type: string
  fn: EventListener
  isDocumentListener: boolean
  constructor(type: string, fn, isDocumentListener = true) {
    this.type = type
    this.fn = fn
    this.isDocumentListener = isDocumentListener
  }

  add() {
    this._getElem().addEventListener(this.type, this.fn, false)
  }

  remove() {
    this._getElem().removeEventListener(this.type, this.fn)
  }

  _getElem() {
    return this.isDocumentListener ? document : window
  }
}