// @flow weak

const findComponentName = (path) => {
  let name;

  if (path.parentPath.type === 'ArrowFunctionExpression') {
    return path.getFunctionParent().container.id.name;
  }

  path.findParent((parent) => {
    if (
      parent.isVariableDeclarator() &&
      parent.node.init.type === 'CallExpression' &&
      parent.node.init.callee.type === 'MemberExpression' &&
      parent.node.init.callee.property.name === 'createClass' &&
      true
    ) {
      name = parent.node.id.name;
    }
  });

  return name || '';
};

export default function({types: t}) {
  const defaultPrefix = 'data-qa';
  let prefix;
  let filenameAttr;
  let nodeNameAttr;

  const transformCreateClassSyntax = (path, state) => {
    const isReturningJSX = path.parentPath.type === 'ReturnStatement';

    if (!isReturningJSX) {
      return;
    }

    const parentFunction = path.getFunctionParent();

    if (
      isReturningJSX &&
      parentFunction.container.type === 'ObjectProperty' &&
      parentFunction.container.key.name === 'render' &&
      true
    ) {
      const attributes = path.node.openingElement.attributes;

      attributes.push(
        t.jSXAttribute(
          t.jSXIdentifier(nodeNameAttr),
          t.stringLiteral(findComponentName(path))
        )
      );

      attributes.push(t.jSXAttribute(
        t.jSXIdentifier(filenameAttr),
        t.stringLiteral(state.file.opts.basename || ''))
      );
    }
  };

  const transformArrowFunctionSyntax = (path, state) => {
    if (
      path.parentPath.type === 'ArrowFunctionExpression' &&
      true
    ) {
      const attributes = path.node.openingElement.attributes;

      attributes.push(
        t.jSXAttribute(
          t.jSXIdentifier(nodeNameAttr),
          t.stringLiteral(findComponentName(path))
        )
      );

      attributes.push(t.jSXAttribute(
        t.jSXIdentifier(filenameAttr),
        t.stringLiteral(state.file.opts.basename || ''))
      );
    }
  };

  const visitor = {
    Program(path, state) {
      if (state.opts.prefix) {
        prefix = `data-${state.opts.prefix}`;
      } else {
        prefix = defaultPrefix;
      }
      filenameAttr = `${prefix}-file`;
      nodeNameAttr = `${prefix}-node`;
    },
    JSXElement(path, state) {
      transformCreateClassSyntax(path, state);
      transformArrowFunctionSyntax(path, state);
    },
  };

  return {
    visitor,
  };
}
