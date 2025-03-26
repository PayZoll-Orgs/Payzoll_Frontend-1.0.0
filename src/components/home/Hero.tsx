"use client"
import WorldMap from "../ui/WorldMap"
import { motion } from "motion/react"

export default function Hero() {
  return (
    <section id="home">
    <div className="py-40 bg-black w-full">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-bold text-xl md:text-4xl text-white">
          Remote{" "}
          <span className="text-neutral-400">
            {"Connectivity".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm md:text-lg text-neutral-400 max-w-2xl mx-auto py-4">
          Break free from traditional boundaries. Work from anywhere, at the comfort of your own studio apartment.
          Perfect for Nomads and Travellers.
        </p>
      </div>
      <WorldMap
        dots={[
          {
            start: {
              lat: 64.2008,
              lng: -149.4937,
            }, // Alaska (Fairbanks)
            end: {
              lat: 34.0522,
              lng: -118.2437,
            }, // Los Angeles
          },
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
            end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
          },
          {
            start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
          },
          // New connections within India
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: 19.076, lng: 72.8777 }, // Mumbai
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: 12.9716, lng: 77.5946 }, // Bangalore
          },
          {
            start: { lat: 19.076, lng: 72.8777 }, // Mumbai
            end: { lat: 12.9716, lng: 77.5946 }, // Bangalore
          },
          {
            start: { lat: 19.076, lng: 72.8777 }, // Mumbai
            end: { lat: 22.5726, lng: 88.3639 }, // Kolkata
          },
          {
            start: { lat: 12.9716, lng: 77.5946 }, // Bangalore
            end: { lat: 13.0827, lng: 80.2707 }, // Chennai
          },
          {
            start: { lat: 17.385, lng: 78.4867 }, // Hyderabad
            end: { lat: 12.9716, lng: 77.5946 }, // Bangalore
          },
          {
            start: { lat: 17.385, lng: 78.4867 }, // Hyderabad
            end: { lat: 22.5726, lng: 88.3639 }, // Kolkata
          },
          // International connections from Indian cities
          {
            start: { lat: 19.076, lng: 72.8777 }, // Mumbai
            end: { lat: 25.2048, lng: 55.2708 }, // Dubai
          },
          {
            start: { lat: 12.9716, lng: 77.5946 }, // Bangalore
            end: { lat: 1.3521, lng: 103.8198 }, // Singapore
          },
        ]}
      />
    </div>
    </section>
  )
}

