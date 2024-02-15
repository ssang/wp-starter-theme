export default function SettingsLabel({ children, className, title }) {
  return (
    <h3 className={`font-medium text-[11px] uppercase peer/label mb-1 peer-[]/label:mt-2 ${className ?? ''}`}>
      { title ?? children }
    </h3>
  )
}