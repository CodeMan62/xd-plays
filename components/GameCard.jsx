"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function GameCard({ 
  title, 
  image, 
  href, 
  gradient = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  className 
}) {
  return (
    <Link href={href} className={cn("gym-card", className)}>
      <div 
        className="gym-card-image"
        style={{ background: image ? 'transparent' : gradient }}
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="snake-preview">
            <div className="snake-pixel"></div>
            <div className="snake-pixel"></div>
            <div className="snake-pixel"></div>
          </div>
        )}
      </div>
      <h3 className="gym-card-title">{title}</h3>
    </Link>
  );
}
