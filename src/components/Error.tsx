type ErrorProps = {
    children: React.ReactNode
}

export default function Error({children}:ErrorProps) {
  return (
    <p 
      className="text-center p-2  my-2 bg-red-600 text-white font-bold uppercase text-sm"
    >{children}</p>
  )
}
