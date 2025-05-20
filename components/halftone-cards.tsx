"use client"

import { useState } from "react"
import { Clock, Share, User } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { HalftoneCanvas } from "@/components/halftone-canvas"
import html2canvas from "html2canvas"

export function HalftoneCards() {
  const [dotSize, setDotSize] = useState(4)
  const [spacing, setSpacing] = useState(8)
  const [threshold, setThreshold] = useState(128)
  const [noise, setNoise] = useState(0.2)
  const [color1, setColor1] = useState("#ff66cc")
  const [color2, setColor2] = useState("#ccff00")

  // Editable footer text
  const [distance1, setDistance1] = useState("21.16km")
  const [time1, setTime1] = useState("01:45:33")
  const [distance2, setDistance2] = useState("21.19km")
  const [time2, setTime2] = useState("02:17:11")
  const [pace, setPace] = useState("05'43")

  const today = new Date()
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  // Download card as image
  const downloadCard = async (cardId: string) => {
    const card = document.getElementById(cardId)
    if (!card) return
    const canvas = await html2canvas(card, { backgroundColor: null })
    const link = document.createElement("a")
    link.download = "halftone-card.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="w-full max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="relative">
          <Card id="halftone-card-1" className="w-full aspect-square rounded-[32px] overflow-hidden bg-pink-50 p-5 shadow-lg border-0">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-1 text-gray-700">
                <User size={16} className="fill-gray-700" />
                <span className="text-sm font-medium">{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-pink-200 text-pink-700 px-3 py-1 rounded-full text-xs font-medium">Uncommon</span>
                <button className="text-gray-500 hover:text-gray-700">
                  <Share size={16} />
                </button>
              </div>
            </div>

            <div className="relative w-full aspect-square rounded-[24px] overflow-hidden bg-blue-100 mb-3">
              <HalftoneCanvas color={color1} dotSize={dotSize} spacing={spacing} threshold={threshold} noise={noise} />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <span className="font-mono">{distance1}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span className="font-mono">{time1}</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="relative">
          <Card id="halftone-card-2" className="w-full aspect-square rounded-[32px] overflow-hidden bg-pink-50 p-5 shadow-lg border-0">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-1 text-gray-700">
                <User size={16} className="fill-gray-700" />
                <span className="text-sm font-medium">{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-lime-200 text-lime-700 px-3 py-1 rounded-full text-xs font-medium">Rare</span>
                <button className="text-gray-500 hover:text-gray-700">
                  <Share size={16} />
                </button>
              </div>
            </div>

            <div className="relative w-full aspect-square rounded-[24px] overflow-hidden bg-gray-200 mb-3">
              <HalftoneCanvas color={color2} dotSize={dotSize} spacing={spacing} threshold={threshold} noise={noise} />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <span className="font-mono">{distance2}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span className="font-mono">{time2}</span>
              </div>
              <div className="text-xs text-gray-500">≫ {pace}</div>
            </div>
          </Card>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-bold mb-4">Customize Halftone Pattern</h2>

        <div className="grid gap-6">
          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="dot-size">Dot Size</Label>
              <span className="text-sm text-gray-500">{dotSize}px</span>
            </div>
            <div className="flex gap-2">
              {[1,2,3,4,5,6,7,8,9,10].map(val => (
                <button
                  key={val}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition ${dotSize === val ? 'border-pink-500 bg-pink-200' : 'border-gray-300 bg-white'}`}
                  onClick={() => setDotSize(val)}
                  aria-label={`Dot size ${val}`}
                >
                  <div style={{width: val*2, height: val*2, borderRadius: '50%', background: color1, margin: 'auto'}} />
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label htmlFor="spacing">Dot Spacing</Label>
              <span className="text-sm text-gray-500">{spacing}px</span>
            </div>
            <Slider
              id="spacing"
              min={4}
              max={20}
              step={1}
              value={[spacing]}
              onValueChange={(value) => setSpacing(value[0])}
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="threshold">Threshold</Label>
              <span className="text-sm text-gray-500">{threshold}</span>
            </div>
            <div className="flex gap-2">
              {[32,64,96,128,160,192,224,255].map(val => (
                <button
                  key={val}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition ${threshold === val ? 'border-green-500 bg-green-100' : 'border-gray-300 bg-white'}`}
                  onClick={() => setThreshold(val)}
                  aria-label={`Threshold ${val}`}
                >
                  <div style={{width: 16, height: 16, borderRadius: '50%', background: color1, margin: 'auto', opacity: val/255}} />
                  <span className="sr-only">{val}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label htmlFor="noise">Noise</Label>
              <span className="text-sm text-gray-500">{noise.toFixed(2)}</span>
            </div>
            <Slider
              id="noise"
              min={0}
              max={1}
              step={0.05}
              value={[noise]}
              onValueChange={(value) => setNoise(value[0])}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="color1" className="block mb-2">
                Card 1 Color
              </Label>
              <div className="flex items-center gap-2">
                <input
                  id="color1"
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer"
                />
                <span className="text-sm font-mono">{color1}</span>
              </div>
            </div>

            <div>
              <Label htmlFor="color2" className="block mb-2">
                Card 2 Color
              </Label>
              <div className="flex items-center gap-2">
                <input
                  id="color2"
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer"
                />
                <span className="text-sm font-mono">{color2}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4 mt-2">
            <h3 className="text-md font-bold mb-4">Edit Card Text</h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="distance1" className="block mb-2">
                  Card 1 Distance
                </Label>
                <Input
                  id="distance1"
                  value={distance1}
                  onChange={(e) => setDistance1(e.target.value)}
                  className="font-mono"
                />
              </div>
              <div>
                <Label htmlFor="time1" className="block mb-2">
                  Card 1 Time
                </Label>
                <Input id="time1" value={time1} onChange={(e) => setTime1(e.target.value)} className="font-mono" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="distance2" className="block mb-2">
                  Card 2 Distance
                </Label>
                <Input
                  id="distance2"
                  value={distance2}
                  onChange={(e) => setDistance2(e.target.value)}
                  className="font-mono"
                />
              </div>
              <div>
                <Label htmlFor="time2" className="block mb-2">
                  Card 2 Time
                </Label>
                <Input id="time2" value={time2} onChange={(e) => setTime2(e.target.value)} className="font-mono" />
              </div>
              <div>
                <Label htmlFor="pace" className="block mb-2">
                  Card 2 Pace
                </Label>
                <Input id="pace" value={pace} onChange={(e) => setPace(e.target.value)} className="font-mono" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
