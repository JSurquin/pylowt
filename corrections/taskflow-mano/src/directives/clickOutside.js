export const vClickOutside = {
  mounted(el, binding) {
    // Stocker la fonction de callback
    el._clickOutsideHandler = (event) => {
      // Vérifier si le clic est en dehors de l'élément
      if (!el.contains(event.target) && el !== event.target) {
        // Exécuter la fonction fournie
        binding.value(event);
      }
    };
    
    // Ajouter l'écouteur d'événements avec un délai
    setTimeout(() => {
      document.addEventListener('click', el._clickOutsideHandler);
    }, 0);
  },
  
  unmounted(el) {
    // Nettoyer l'écouteur d'événements
    document.removeEventListener('click', el._clickOutsideHandler);
  }
};

