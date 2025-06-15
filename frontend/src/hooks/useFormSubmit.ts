import { useState } from "react"

type UseFormSubmitOptions<T> = {
  initialData: T
  onSubmit: (data: T) => Promise<void>
}

export function useFormSubmit<T>({
  initialData,
  onSubmit,
}: UseFormSubmitOptions<T>) {
  const [formData, setFormData] = useState<T>(() => initialData)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await onSubmit(formData)
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || "Something went wrong"
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return {
    formData,
    setFormData,
    error,
    loading,
    handleChange,
    handleSubmit,
  }
}
