export function ConditionalWrap(props) {
  const { children, condition, whenTrue, whenFalse, ...rest } = props;

  return condition ? whenTrue(children, rest) : whenFalse(children, rest);
}
