"use client";

import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import { geoMercator } from "d3-geo";
import { feature } from "topojson-client";

const PAGE_BG = "#081712";
const PANEL_BG = "#064e3b";
const ACCENT = "#16a34a";
const TEXT_LIGHT = "#f2ede2";
const TEXT_MUTED = "#9fb7a8";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const CENTRAL_ASIA = ["Kazakhstan", "Uzbekistan", "Turkmenistan", "Kyrgyzstan", "Tajikistan"];

// Фиксированный "холст" — намеренно широкий, не зависит от реального размера экрана
const CANVAS_W = 1600;
const CANVAS_H = 620;
const PADDING = 40;

const COUNTRIES = [
  { name: "Казахстан", city: "Астана", coords: [71.4, 51.2] as [number, number], hub: true },
  { name: "Узбекистан", city: "Ташкент", coords: [69.2, 41.3] as [number, number], hub: false },
  { name: "Туркменистан", city: "Ашхабад", coords: [58.4, 37.9] as [number, number], hub: false },
  { name: "Кыргызстан", city: "Бишкек", coords: [74.6, 42.9] as [number, number], hub: false },
  { name: "Таджикистан", city: "Душанбе", coords: [68.8, 38.6] as [number, number], hub: false },
];

const HUB = COUNTRIES.find((c) => c.hub)!;
const SPOKES = COUNTRIES.filter((c) => !c.hub);

export default function CentralAsiaMap() {
  const [fit, setFit] = useState<{ scale: number; center: [number, number] } | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(geoUrl)
      .then((r) => r.json())
      .then((topo) => {
        if (cancelled) return;
        const objectName = Object.keys(topo.objects)[0];
        const all = (feature(topo, topo.objects[objectName]) as any).features;
        const filtered = {
          type: "FeatureCollection",
          features: all.filter((f: any) => CENTRAL_ASIA.includes(f.properties.name)),
        };

        const projection = geoMercator().fitExtent(
          [
            [PADDING, PADDING],
            [CANVAS_W - PADDING, CANVAS_H - PADDING],
          ],
          filtered as any
        );

        const center = projection.invert ? projection.invert([CANVAS_W / 2, CANVAS_H / 2]) : [63, 44];

        setFit({ scale: projection.scale(), center: (center as [number, number]) ?? [63, 44] });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${PAGE_BG} 0%, ${PANEL_BG} 100%)` }}
    >
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(${TEXT_LIGHT} 1px, transparent 1px)`, backgroundSize: "28px 28px" }}
      />

      <div className="relative text-center mb-8 px-6">
        <h2 className="text-4xl md:text-5xl font-bold" style={{ color: TEXT_LIGHT }}>
          Центральный хаб
        </h2>
      </div>

      <div className="relative w-screen" style={{ height: "75vh", marginLeft: "calc(50% - 50vw)" }}>
        {fit && (
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ center: fit.center, scale: fit.scale }}
            width={CANVAS_W}
            height={CANVAS_H}
            style={{ width: "100%", height: "100%" }}
            preserveAspectRatio="none"
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies
                  .filter((geo) => CENTRAL_ASIA.includes(geo.properties.name))
                  .map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: { fill: "rgba(22,163,74,0.18)", stroke: ACCENT, strokeWidth: 1.4, outline: "none" },
                        hover: { fill: "rgba(22,163,74,0.28)", stroke: ACCENT, strokeWidth: 1.4, outline: "none" },
                        pressed: { fill: "rgba(22,163,74,0.28)", stroke: ACCENT, strokeWidth: 1.4, outline: "none" },
                      }}
                    />
                  ))
              }
            </Geographies>

            {SPOKES.map((c) => (
              <Line key={c.name} from={HUB.coords} to={c.coords} stroke={ACCENT} strokeWidth={1.2} strokeDasharray="4 3" strokeOpacity={0.6} />
            ))}

            {COUNTRIES.map((c) => (
              <Marker key={c.name} coordinates={c.coords}>
                <circle r={c.hub ? 11 : 8} fill={ACCENT} stroke="#04150e" strokeWidth={2.5} />
                <text textAnchor="middle" y={-20} style={{ fontFamily: "inherit", fontWeight: 700, fontSize: c.hub ? 20 : 17, fill: TEXT_LIGHT }}>
                  {c.name}
                </text>
                <text textAnchor="middle" y={28} style={{ fontFamily: "inherit", fontSize: 14, fill: TEXT_MUTED }}>
                  {c.city}
                </text>
              </Marker>
            ))}
          </ComposableMap>
        )}
      </div>
    </section>
  );
}