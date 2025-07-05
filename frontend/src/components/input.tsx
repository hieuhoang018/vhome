interface InputFieldProps {
  label: string
  placeholder: string
  inputType: string
  name: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputField({
  label,
  placeholder,
  inputType,
  name,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <p>
      <label htmlFor={name}>{label}</label>
      <input
        type={inputType}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border p-2 w-full rounded-lg mb-4 mt-2${
          name === "description" || name === "deliveryNotes" ? " min-h-[120px]" : ""
        }`}
      />
    </p>
  )
}
