export const vAutoFocus = {
  mounted(el, binding) {
    // Si binding.value === false, ne pas focus
    if (binding.value === false) return;
    
    // Focus avec un délai pour s'assurer que le DOM est prêt
    setTimeout(() => {
      el.focus();
    }, 100);
  },
  
  updated(el, binding) {
    // Si la valeur passe de false à true, focus
    if (binding.value === true && binding.oldValue === false) {
      setTimeout(() => {
        el.focus();
      }, 100);
    }
  }
};
