import { useEffect, useState } from "react"

const SplashScreen = () => {

  const [animate, setAnimate] = useState(false)

  useEffect(() => {

    const timer = setTimeout(() => {
      setAnimate(true)
    }, 200)

    return () => clearTimeout(timer)

  }, [])

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999] overflow-hidden">

      <div className={`
        absolute
        w-[400px]
        h-[400px]
        rounded-full
        bg-green-600
        blur-[150px]
        transition-all
        duration-[2000ms]
        ${animate ? "opacity-40 scale-125" : "opacity-0 scale-75"}
      `} />

      <img
        src="/images/logo.png"
        alt="logo"
        className={`
          relative
          w-28
          md:w-36
          transition-all
          duration-[1400ms]
          ease-out
          ${animate ? "scale-100 opacity-100" : "scale-50 opacity-0"}
        `}
      />

    </div>
  )
}

export default SplashScreen