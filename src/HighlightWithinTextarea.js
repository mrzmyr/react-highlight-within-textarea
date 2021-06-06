import React from "react";
import { useState, forwardRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Editor, EditorState, ContentState } from "draft-js";
import highlightToCompositeDecorator from "./highlightToCompositeDecorator.js";

const HighlightWithinTextareaFunc = forwardRef((props, ref) => {
  const { placeholder, highlight, onChange, value } = props;
  let [onChangeState, setOnChangeState] = useState({
    prev: { value: null, editorState: null },
    next: { value: null, editorState: null },
  });

  let editorState;
  if (value === onChangeState.next.value) {
    editorState = onChangeState.next.editorState;
  } else if (value === onChangeState.prev.value) {
    editorState = onChangeState.prev.editorState;
  } else {
    const contentState = ContentState.createFromText(value);
    editorState = EditorState.createWithContent(contentState);
  }

  const decorator = useMemo(
    () => highlightToCompositeDecorator(highlight),
    [highlight]
  );
  if (decorator !== editorState.decorator) {
    editorState = EditorState.set(editorState, {
      decorator: decorator,
    });
  }

  const onDraftChange = (editorState) => {
    const value = editorState.getCurrentContent().getPlainText();
    setOnChangeState({
      prev: onChangeState.next,
      next: { value: value, editorState: editorState },
    });
    onChange(value);
  };

  return (
    <Editor
      editorState={editorState}
      onChange={onDraftChange}
      placeholder={placeholder}
      ref={ref}
    />
  );
});

/*
 * For some reason, exporting a FunctionComponent
 * doesn't work when importing in codepen.io, so wrap
 * it in a class component.
 */
class HighlightWithinTextarea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return <HighlightWithinTextareaFunc {...this.props} />;
  }
}

HighlightWithinTextarea.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
  highlight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.instanceOf(RegExp),
    PropTypes.object,
    PropTypes.func,
  ]),
  placeholder: PropTypes.string,
};

HighlightWithinTextarea.defaultProps = {
  highlight: null,
  placeholder: "Enter some text...",
};

export default HighlightWithinTextarea;
