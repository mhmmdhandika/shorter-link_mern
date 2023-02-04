interface LabelInputTypes {
  label: string;
  name: string;
  id: string;
  type: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

function LabelInput({
  label,
  name,
  id,
  type,
  containerClassName,
  labelClassName,
  inputClassName,
}: LabelInputTypes) {
  const containerStyles = [containerClassName],
    labelStyles = [labelClassName],
    inputStyles = [inputClassName];

  return (
    <div className={`${containerStyles.join(' ')} my-4`}>
      <label
        htmlFor={id}
        className={`${labelStyles.join(' ')} block mb-1 text-lg`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className={`${inputStyles.join(
          ' '
        )} border border-neutral-grayfish-violet/50 bg-slate-100 rounded-md px-3 py-2 focus:outline-primary-cyan invalid:border-secondary-red`}
      />
    </div>
  );
}
export default LabelInput;
