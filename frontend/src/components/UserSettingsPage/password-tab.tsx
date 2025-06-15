export default function PasswordTab() {
  return (
    <div>
      <h1 className="text-lg font-medium mb-2">Update Password</h1>
      <h2 className="mt-3">Current Password</h2>
      <input
        type="password"
        placeholder="Enter your current password"
        className="border rounded-md px-4 py-2 mt-2 w-full"
      ></input>
      <h2 className="mt-3">New Password</h2>
      <input
        type="password"
        placeholder="Enter your new password"
        className="border rounded-md px-4 py-2 mt-2 w-full"
      ></input>
      <h2 className="mt-3">Confirm New Password</h2>
      <input
        type="password"
        placeholder="Confirm your new password"
        className="border rounded-md px-4 py-2 mt-2 w-full"
      ></input>
      <hr className="my-8 border-gray-200" />
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Update Password
        </button>
      </div>
    </div>
  )
}
