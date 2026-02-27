"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function GameCard({ 
  title, 
  image, 
  href, 
  gradient = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  className 
}) {
  return (
    <Link href={href}>
      <Card className={cn("overflow-hidden transition-all hover:scale-105 hover:shadow-xl", className)}>
        <CardContent className="p-0">
          <div 
            className="relative w-full h-48 flex items-center justify-center"
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
              <div className="flex gap-2 items-center">
                <div className="w-5 h-5 bg-white rounded shadow-md"></div>
                <div className="w-5 h-5 bg-white rounded shadow-md"></div>
                <div className="w-5 h-5 bg-white rounded shadow-md"></div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="justify-center py-4">
          <h3 className="text-base font-medium text-muted-foreground">{title}</h3>
        </CardFooter>
      </Card>
    </Link>
  );
}
