const focusDirective = {
   mounted(el) {
      el.focus()
   },
   updated(el) {
      el.focus()
   }
}

export default app => {
   app.directive('focus', focusDirective)
}