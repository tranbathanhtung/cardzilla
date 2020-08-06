import * as React from "react";
import { useForm } from "react-hook-form";

import { useMount } from "hooks/useMount";

const noop = () => {};

export default function Form({
  defaultValues,
  children,
  onSubmit,
  onChange,
  onFormDidMount = noop,
  ...rest
}) {
  const methods = useForm({ defaultValues, mode: "onChange" });
  const { handleSubmit } = methods;

  useMount(() => {
    onFormDidMount(methods);
  });

  const formProps = {
    onChange: onChange ? handleSubmit(onChange) : undefined,
    onSubmit: onSubmit ? handleSubmit(onSubmit) : undefined,
    ...rest,
  };

  return (
    <form {...formProps}>
      {React.Children.map(children, (child) => {
        if (!child) return child;

        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                control: methods.control,
                errors: methods.errors,
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
}
