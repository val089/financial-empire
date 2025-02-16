const cssInteropTemplate = (
  { imports, interfaces, componentName, props, jsx, exports },
  { tpl }
) => {
  return tpl`${imports}
  import { cssInterop } from 'nativewind';
  ${interfaces}

  const ${componentName} = cssInterop((${props}) => {
    return ${jsx};
  }, {
    className: {
      target: 'style',
      nativeStyleToProp: { width: true, height: true, fill: true, stroke: true },
    },
  })

  ${exports}
    `;
};

module.exports = cssInteropTemplate;
