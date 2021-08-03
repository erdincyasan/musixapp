import _ from 'lodash';

export default {
  install(app) {
    const baseComponents = require.context('../components/base', false, /[A-Za-a0-9-_,\s]+\.vue$/i);

    baseComponents.keys().forEach((fileName) => {
      const componentConfig = baseComponents(fileName, false);
      const componentName = _.upperFirst(
        _.camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')),
      );
      // export default
      app.component(`Base${componentName}`, componentConfig.default || componentConfig);
    });
  },
};
