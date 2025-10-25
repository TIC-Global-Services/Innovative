"use client"

import TurnoverChart from "./TurnoverChart"

interface TurnoverData {
  year: string
  value: number
}

const defaultData: TurnoverData[] = [
  { year: "16-17", value: 28 },
  { year: "17-18", value: 25 },
  { year: "18-19", value: 19 },
  { year: "19-20", value: 18 },
  { year: "20-21", value: 20 },
  { year: "21-22", value: 27 },
  { year: "22-23", value: 29 },
  { year: "23-24", value: 42 },
]

const TurnoverChartWithControls = () => {

  return (
    <div className="space-y-6 ">
        <TurnoverChart data={defaultData} />
    </div>
  )
}

export default TurnoverChartWithControls
