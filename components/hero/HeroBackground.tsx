"use client";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1454496522488-7a8e488e8606')"
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
    </div>
  );
}