import React from "react"
import { useRouter } from "next/router"

interface MobileMenuProps {
  visible?: boolean
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {

  const router = useRouter()

  if (!visible) return null

  const items = [
    { label: "Басты бет", href: "/" },
    { label: "Фильмдер", href: "/movies" },
    { label: "Профиль", href: "/profiles" },
    { label: "Біздің команда", href: "/teams" },
  ]

  return (
    <div className="
      absolute
      top-10
      left-0
      w-64
      bg-zinc-900
      border
      border-zinc-800
      rounded-xl
      shadow-xl
      backdrop-blur
      overflow-hidden
    ">

      <div className="flex flex-col py-2">

        {items.map((item) => (
          <div
            key={item.href}
            onClick={() => router.push(item.href)}
            className="
              px-6
              py-3
              text-white
              text-sm
              cursor-pointer
              hover:bg-zinc-800
              transition
            "
          >
            {item.label}
          </div>
        ))}

      </div>

    </div>
  )
}

export default MobileMenu