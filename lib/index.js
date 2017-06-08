'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  var defaultPrefix = 'data-qa';
  var defaultDebugProperty = 'qa';

  var prefix = void 0;
  var componentAttr = void 0;

  var visitor = {
    Program: function Program(path, state) {
      if (state.opts.prefix) {
        prefix = 'data-' + state.opts.prefix;
      } else {
        prefix = defaultPrefix;
      }
      componentAttr = prefix + '-component';
    },
    JSXOpeningElement: function JSXOpeningElement(path, state) {
      var attributes = path.container.openingElement.attributes;
      var newAttributes = [];

      if (state.file && state.file.opts) {
        var source = state.file.opts.sourceFileName.replace(/\/index.jsx$/, '').replace(/.jsx$/, '');

        newAttributes.push(t.jSXAttribute(t.jSXIdentifier(componentAttr), t.jSXExpressionContainer(t.logicalExpression('&&', t.memberExpression(t.memberExpression(t.identifier('window'), t.identifier('__DEBUG')), t.identifier(defaultDebugProperty)), t.stringLiteral(source)))));
      }

      attributes.push.apply(attributes, newAttributes);
    }
  };

  return {
    visitor: visitor
  };
};