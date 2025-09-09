import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function embedProduct(fields: {
  name: string
  description: string
  category: string
  colors?: string[]
}) {
  const text = [
    `name: ${fields.name}`,
    `category: ${fields.category}`,
    `description: ${fields.description}`,
    fields.colors?.length ? `colors: ${fields.colors.join(", ")}` : "",
  ]
    .filter(Boolean)
    .join("\n")

  const res = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  })

  return res.data[0].embedding
}
