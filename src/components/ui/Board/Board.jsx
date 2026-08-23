
export const Board = ({ children, className }) => {
  return (
    <div className={`border border-gray-400 rounded ${className}`}>{children}
    </div>
  )
}
