export default function Block({
  children,
  className
}) {
  return (
    <div className={`container group/block ${className ?? ''}`}>
      { children }
    </div>
  )
}