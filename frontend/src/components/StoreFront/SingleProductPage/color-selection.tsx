interface ColorSelectionProps {
  colorList: string[]
  chosenColor: string | null
  setChosenColor: (color: string) => void
}

export default function ColorSelection({ colorList, chosenColor, setChosenColor }: ColorSelectionProps) {
  return (
    <div className="flex flex-wrap gap-1 mb-9">
      {colorList.map((color) => (
      <button
        key={color}
        className={`border rounded-lg px-3.5 py-1 hover:cursor-pointer ${
        chosenColor === color ? "bg-gray-200 border-black" : ""
        }`}
        onClick={() => setChosenColor(color)}
      >
        <p className="text-2xl font-serif">{color}</p>
      </button>
      ))}
    </div>
  )
}
