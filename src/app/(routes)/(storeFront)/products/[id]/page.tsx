export default function IndividualProductListing({
  params,
}: {
  params: { id: string }
}) {
  return (
    <>
      <h1>Individual Blog {params.id}</h1>
    </>
  )
}
