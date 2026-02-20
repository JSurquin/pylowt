export const vTooltip = {
  mounted(el, binding) {
    let tooltipEl;
    
    // Configuration du tooltip
    const options = typeof binding.value === 'string'
      ? { text: binding.value, position: 'top', theme: 'dark' }
      : { position: 'top', theme: 'dark', ...binding.value };
    
    const createTooltip = () => {
      // Créer l'élément tooltip
      tooltipEl = document.createElement('div');
      tooltipEl.textContent = options.text;
      tooltipEl.className = `tooltip tooltip--${options.theme} tooltip--${options.position}`;
      
      document.body.appendChild(tooltipEl);
      
      // Positionner le tooltip
      const rect = el.getBoundingClientRect();
      const tooltipRect = tooltipEl.getBoundingClientRect();
      
      let top, left;
      
      switch (options.position) {
        case 'top':
          top = rect.top - tooltipRect.height - 10;
          left = rect.left + (rect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = rect.bottom + 10;
          left = rect.left + (rect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = rect.top + (rect.height - tooltipRect.height) / 2;
          left = rect.left - tooltipRect.width - 10;
          break;
        case 'right':
          top = rect.top + (rect.height - tooltipRect.height) / 2;
          left = rect.right + 10;
          break;
      }
      
      tooltipEl.style.top = `${top + window.scrollY}px`;
      tooltipEl.style.left = `${left + window.scrollX}px`;
      
      // Animation d'apparition
      setTimeout(() => {
        tooltipEl.style.opacity = '1';
      }, 10);
    };
    
    const destroyTooltip = () => {
      if (tooltipEl) {
        tooltipEl.style.opacity = '0';
        setTimeout(() => {
          if (tooltipEl && tooltipEl.parentNode) {
            tooltipEl.parentNode.removeChild(tooltipEl);
          }
          tooltipEl = null;
        }, 200);
      }
    };
    
    // Ajouter les écouteurs d'événements
    el._mouseenterHandler = createTooltip;
    el._mouseleaveHandler = destroyTooltip;
    
    el.addEventListener('mouseenter', el._mouseenterHandler);
    el.addEventListener('mouseleave', el._mouseleaveHandler);
  },
  
  unmounted(el) {
    // Nettoyer les écouteurs d'événements
    el.removeEventListener('mouseenter', el._mouseenterHandler);
    el.removeEventListener('mouseleave', el._mouseleaveHandler);
  }
};
