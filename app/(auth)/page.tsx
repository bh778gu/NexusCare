"use client";
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useEffect } from 'react';
import './App.css';
import SplitScreenComponent from './components/SplitScreenComponent/SplitScreenComponent';

const tools = [
  {
    label:"Coversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation"
  },
]


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the React App</h1>
      </header>
      <SplitScreenComponent />
    </div>
  );
}

const DashboardPage = ()  => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;


    document.head.appendChild(script);

    return () => {
      // Cleanup when the component unmounts
      document.head.removeChild(script);
    };
  }, []);

  const App: React.FC = () => {
    return (
        <div className="App">
            <SplitScreenComponent />
        </div>
    );
  }

const router = useRouter();  
  return (
    <div>
      {/* Include the Calendly badge widget */}
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />

      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Get your questions answered
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with your personal assistant
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)}/>
              </div>
            </div>
            <div className="font-semibold">
              {tool.label}
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  )
}
export default DashboardPage;