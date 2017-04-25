const MyJSXElementContainer = React.createClass({
  render: function () {
    return <div data-someweirdPrefix-node="MyJSXElementContainer" data-someweirdPrefix-file="actual">
        Element contents
      </div>;
  }
});
