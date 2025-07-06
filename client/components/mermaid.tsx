"use client"
import React, { useEffect, useRef } from "react"
import mermaid from "mermaid"

interface RenderResult {
  svg: string;
  bindFunctions?: (element: Element) => void;
}

mermaid.initialize({
  startOnLoad: true,
  theme: "default",
  securityLevel: "loose",
  themeVariables: {
    primaryColor: "#9333ea",
    primaryTextColor: "#1f2937",
    primaryBorderColor: "#9333ea",
    lineColor: "#6b7280",
    secondaryColor: "#f3e8ff",
    tertiaryColor: "#fdf4ff"
  }
})

interface MermaidProps {
  chart: string
  className?: string
}

export default function Mermaid({ chart, className = "" }: MermaidProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (elementRef.current) {
      mermaid.render("mermaid", chart).then((result: RenderResult) => {
        if (elementRef.current) {
          elementRef.current.innerHTML = result.svg
        }
      })
    }
  }, [chart])

  return (
    <div 
      ref={elementRef} 
      className={`flex justify-center items-center ${className}`}
    />
  )
} 