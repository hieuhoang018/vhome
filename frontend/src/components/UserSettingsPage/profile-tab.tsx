export default function ProfileTab() {
  return (
    <div>
      <h1 className="text-lg font-medium mb-2">Personal Information</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <h2>First Name</h2>
          <input
            type="text"
            placeholder="First Name"
            className="border rounded-md px-4 py-2 mt-2 w-full"
          ></input>
        </div>
        <div className="col-span-1">
          <h2>Last Name</h2>
          <input
            type="text"
            placeholder="Last Name"
            className="border rounded-md px-4 py-2 mt-2 w-full"
          ></input>
        </div>
      </div>
      <hr className="my-8 border-gray-200" />
      <h1 className="text-lg font-medium mb-2">Contact Information</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <h2>Email</h2>
          <input
            type="text"
            placeholder="example@email.com"
            className="border rounded-md px-4 py-2 mt-2 w-full"
          ></input>
        </div>
        <div className="col-span-1">
          <h2>Phone Number</h2>
          <input
            type="tel"
            placeholder="+358 01 234 5678"
            className="border rounded-md px-4 py-2 mt-2 w-full"
          />
        </div>
      </div>
      <hr className="my-8 border-gray-200" />
      <h1 className="text-lg font-medium mb-2">Address</h1>
      <h2>Street Address</h2>
      <input
        type="text"
        placeholder="Address"
        className="border rounded-md px-4 py-2 mt-2 w-full"
      ></input>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="col-span-1">
          <h2>City</h2>
          <input
            type="text"
            placeholder="City"
            className="border rounded-md px-4 py-2 mt-2 w-full"
          ></input>
        </div>
        <div className="col-span-1">
          <h2>Zip Code</h2>
          <input
            type="text"
            placeholder="Zip Code"
            className="border rounded-md px-4 py-2 mt-2 w-full"
          ></input>
        </div>
        <div className="col-span-1">
          <h2>Country</h2>
          <input
            type="text"
            placeholder="Country"
            className="border rounded-md px-4 py-2 mt-2 w-full"
          ></input>
        </div>
      </div>
      <hr className="my-8 border-gray-200" />
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Information
        </button>
      </div>
    </div>
  )
}
