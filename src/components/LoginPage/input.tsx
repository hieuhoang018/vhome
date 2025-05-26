export default function InputField({
  label,
  placeholder,
  inputType,
}: {
  label: string
  placeholder: string
  inputType: string
}) {
  return (
    <p>
      <label>{label}</label>
      <input
        type={inputType}
        name={label.toLowerCase()}
        id={label.toLowerCase()}
        placeholder={placeholder}
        className="border p-2 w-full rounded-lg mb-4 mt-2"
      />
    </p>
  )
}
