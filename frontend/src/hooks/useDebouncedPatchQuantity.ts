import { useEffect, useState } from "react"
import api from "@/lib/axios"
import { toast } from "sonner"

type Params = {
  initialQuantity: number
  updateItemId: string
  chosenColor: string
  onSuccess?: () => void
}

export function useDebouncedPatchQuantity({
  initialQuantity,
  updateItemId,
  chosenColor,
  onSuccess,
}: Params) {
  const [quantity, setQuantity] = useState(initialQuantity)

  useEffect(() => {
    if (quantity === initialQuantity) return

    const timeout = setTimeout(async () => {
      try {
        await api.patch(`/users/me/cart`, {
          updateItemId,
          chosenColor,
          quantity,
        })
        toast.success("Cart updated")
        onSuccess?.()
      } catch (error) {
        toast.error("Failed to update quantity")
        setQuantity(initialQuantity)
      }
    }, 1000)

    return () => clearTimeout(timeout)
  }, [quantity, initialQuantity, updateItemId, chosenColor, onSuccess])

  return { quantity, setQuantity }
}
