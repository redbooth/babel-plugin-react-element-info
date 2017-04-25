const MyJSXElementContainer = React.createClass({
  render: function () {
    return <div data-qa-node="MyJSXElementContainer" data-qa-file="actual">
        <span>
          Element contents
        </span>
      </div>;
  }
});

const MyArrowFunctionComponent = props => <div data-qa-node="MyArrowFunctionComponent" data-qa-file="actual">oh yeah</div>;
