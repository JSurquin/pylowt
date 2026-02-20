
import { vAutoFocus } from '../directives/autoFocus';
import { vClickOutside } from '../directives/clickOutside';
import { vTooltip } from '../directives/tooltip';

export const TaskFlowDirectives = {
  install(app, options = {}) {
    // Configuration par défaut
    const config = {
      prefix: 'task',
      ...options
    };
    
    // Enregistrer les directives globalement
    app.directive('autoFocus', vAutoFocus);
    app.directive('clickOutside', vClickOutside);
    app.directive('tooltip', vTooltip);
    
    // Ajouter des propriétés globales
    app.config.globalProperties.$taskflowDirectives = {
      version: '1.0.0',
      config
    };
    
    console.log('✅ TaskFlow Directives plugin installé !');
  }
};
