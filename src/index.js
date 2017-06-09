// @flow weak

export default function({types: t}) {
  const defaultPrefix = 'data-qa';
  const defaultDebugProperty = 'qa';

  let prefix;
  let componentAttr;

  const visitor = {
    Program(path, state) {
      if (state.opts.prefix) {
        prefix = `data-${state.opts.prefix}`;
      } else {
        prefix = defaultPrefix;
      }
      componentAttr = `${prefix}-component`;
    },
    JSXOpeningElement(path, state) {
      const attributes = path.container.openingElement.attributes;
      const newAttributes = [];

      if (state.file && state.file.opts) {
        const source = state.file.opts.sourceFileName.replace(/\/index.jsx$/, '').replace(/.jsx$/, '')

        newAttributes.push(t.jSXAttribute(
          t.jSXIdentifier(componentAttr),
          t.jSXExpressionContainer(t.logicalExpression(
            '&&',
            t.memberExpression(
              t.identifier('window'),
              t.identifier('__DEBUG'),
            ),
            t.logicalExpression(
              '&&',
              t.memberExpression(
                t.memberExpression(
                  t.identifier('window'),
                  t.identifier('__DEBUG'),
                ),
                t.identifier(defaultDebugProperty),
              ),
              t.stringLiteral(source)
            )
          )),
        ));
      }

      attributes.push(...newAttributes);
    },
  };

  return {
    visitor,
  };
}
