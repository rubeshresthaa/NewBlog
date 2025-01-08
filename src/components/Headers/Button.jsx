const Button = ({
  children,
  text="text",
  className='',
  bgcolor="bg-blue-600",
  textColor="text-white",
  ...props

}) => {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgcolor} ${textColor} ${className}`} {...props}  >{children}</button>
  )
}
export default Button