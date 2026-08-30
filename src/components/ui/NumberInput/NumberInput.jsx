export const NumberInput = ({
  label,
  hideLabel = false,
  name,
  value,
  onChange,
  min = 0,
  max,
  className = "",
  wrapperClassName = "",
}) => {
  return (
    <label className={`text-center ${wrapperClassName}`}>
      {hideLabel ? (
        <>
          <span className="sr-only">{label}</span>
          <span aria-hidden="true" className="block mb-1"></span>
        </>
      ) : (
        <span className="block mb-1">{label}</span>
      )}
      <input
        type="number"
        name={name}
        value={value}
        min={min}
        max={max}
        onChange={(event) => onChange(Number(event.target.value))}
        className={`
          border
          border-gray-500
          rounded
          show-spinner
          ${className}
        `}
      />
    </label>
  );
};
