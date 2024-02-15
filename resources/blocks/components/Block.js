export default function Block({
  children,
  className,
  bg =  '#fffdec'
}) {
  return (
    <div 
      className={`container bg-[--bg] py-24 group/block group-[]/block:py-0 ${className ?? ''}`}
      style={{ 
        '--bg': bg
       }}
    >
      { children }
    </div>
  )
}