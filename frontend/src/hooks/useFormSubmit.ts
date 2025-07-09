import axios from "axios"
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

  const setField = (name: string, value: string | number) => {
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
    } catch (err: unknown) {
      let msg = "Something went wrong"
      if (axios.isAxiosError(err)) {
        msg = err.response?.data.message
      } else if (err instanceof Error && err.message) {
        msg = err.message
      } else if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as { response?: { data?: { message?: string } } }).response
          ?.data?.message === "string"
      ) {
        msg = (err as { response: { data: { message: string } } }).response.data
          .message
      }

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
    setField,
    handleChange,
    handleSubmit,
  }
}
