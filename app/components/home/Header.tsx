import type { FC } from "react"

interface HeaderProps {
  visible: boolean
}

const Header: FC<HeaderProps> = ({ visible }) => (
  <header
    className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
      visible
        ? "opacity-100 h-16 translate-y-0"
        : "opacity-0 h-0 -translate-y-full"
    }`}
  >
    <div className="bg-gray-900 bg-opacity-95 shadow-md h-full px-6 flex items-center">
      <img
        src="hero_icon.jpg"
        alt="Profile"
        className="w-8 h-8 rounded-full mr-3 object-cover"
      />
      <p className="text-white font-medium">kbkn3</p>
    </div>
  </header>
)

export default Header
