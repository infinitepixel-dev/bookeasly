import { useEffect, useRef } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { gsap } from "gsap"
import BusinessTypeSelection from "./BusinessTypeSelection"
import PropertySetup from "./PropertySetup"
import AppointmentSetup from "./AppointmentSetup"
import { useBusinessType } from "../../../contexts/BusinessTypeContext"

const Signup = () => {
  const navigate = useNavigate()
  const { businessType } = useBusinessType()
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const colors = [
      "bg-indigo-200/30",
      "bg-blue-200/30",
      "bg-purple-200/30",
      "bg-pink-200/30",
    ]

    const circles = Array.from({ length: 25 }).map((_, i) => {
      const circle = document.createElement("div")
      circle.className = `absolute rounded-full ${colors[i % colors.length]}`
      const size = Math.random() * 200 + 100
      circle.style.width = `${size}px`
      circle.style.height = `${size}px`
      circle.style.left = `${Math.random() * 100}%`
      circle.style.top = `${Math.random() * 100}%`
      backgroundRef.current?.appendChild(circle)
      return circle
    })

    circles.forEach((circle) => {
      gsap.to(circle, {
        x: "random(-200, 200)",
        y: "random(-200, 200)",
        scale: "random(0.5, 1.5)",
        opacity: "random(0.2, 0.4)",
        duration: "random(15, 25)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })

    return () => {
      circles.forEach((circle) => circle.remove())
    }
  }, [])

  return (
    <div className="relative flex flex-col justify-center min-h-screen py-12 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 sm:px-6 lg:px-8">
      <div
        ref={backgroundRef}
        className="absolute inset-0 overflow-hidden -z-10"
        style={{ filter: "blur(3px)" }}
      />

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="relative z-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 shadow-lg bg-white/80 backdrop-blur-sm shadow-indigo-100/20 sm:rounded-lg sm:px-10">
          <Routes>
            <Route path="/" element={<BusinessTypeSelection />} />
            <Route
              path="/setup"
              element={
                businessType === "property_rentals" ? (
                  <PropertySetup />
                ) : businessType === "appointments" ? (
                  <AppointmentSetup />
                ) : (
                  <BusinessTypeSelection />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Signup
