export const formatMultilineText = (text: String) => {
  return text.split('\n').map((line, index) => (
    <div key={index}>
      {line}
      <br />
    </div>
  ));
};
