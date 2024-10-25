'use client';
import { useState } from 'react';
import { Loader2, Github, Twitter, Instagram, Linkedin, Music, Moon, Star } from 'lucide-react';
import { generateAndDownloadMidi } from '../app/sailormoongene';
import { Shrikhand } from 'next/font/google'

const shrikhand = Shrikhand({ weight: '400', subsets: ['latin'] })

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const { url, filename } = generateAndDownloadMidi();
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating MIDI:', error);
      alert('Failed to generate MIDI file');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-indigo-900 text-white">
      <div className="w-full max-w-2xl relative">
        <Star className="absolute top-0 left-0 w-8 h-8 text-yellow-200" />
        <Star className="absolute top-0 right-0 w-8 h-8 text-yellow-200" />
        <Moon className="absolute bottom-0 left-0 w-8 h-8 text-yellow-200" />
        <Moon className="absolute bottom-0 right-0 w-8 h-8 text-yellow-200" />
        
        <div className="flex items-center justify-center h-8 mb-4"> {/* Adjusted height and added margin-bottom */}
          <h1 className={`${shrikhand.className} text-3xl text-center text-purple-300 shadow-sm`}>
            City Pop Chord Generator
          </h1>
        </div>
        
        <pre className="text-purple-400 text-center font-mono text-sm leading-[1.2] mb-8">
{`⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢠⡞⡏⡏⡏⠻⣦⠴⠶⠶⠶⢦⣤⣤⣤⣤⣤⣀⡀⣠⠶⢛⢟⠷⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢺⡀⡇⣇⠟⠹⢹⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠯⣀⠂⢌⢤⠊⢷⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⡾⠋⠉⠈⠁⠀⠀⠀⠀⠀⠀⠀⡀⣀⣀⠀⠀⠀⠀⠐⠉⠽⠺⡁⢸⢀⡾⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣸⠗⠉⠉⠁⠀⠀⠀⢠⠀⠀⡤⡠⣀⢤⡤⡀⠀⠀⠀⠀⠀⠀⠃⠱⠚⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⡏⠀⠀⠀⠀⢀⠀⠄⢠⠀⠰⡉⠉⠉⠉⢉⠇⠀⠀⠄⠀⠀⠀⠀⠀⡇⠘⣧⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢷⣄⡎⠀⠄⠘⢄⡈⢢⠗⠒⠣⡀⠀⠀⠑⡶⠶⠬⡼⠀⠀⠀⠀⠀⠀⠀⠸⣆⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠹⣧⠀⢈⣒⠖⠊⠁⠀⠀⠀⠁⠀⠀⠈⠀⠀⠘⠠⡄⠤⠃⡀⠀⡆⠀⠀⢹⡄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢰⠏⢑⠂⣡⠐⠒⢲⣶⡖⠢⠀⠀⠀⠀⣤⣤⣀⣀⡈⠱⣈⣠⢠⣿⡀⠀⠀⢷⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⡟⠀⠈⡄⢸⠀⠀⣀⣙⡓⠊⠀⠀⠀⠀⠘⠿⠤⠜⠀⠁⡦⠌⣿⠸⣇⠀⠀⠸⣇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣼⠁⠀⠀⣸⢿⡀⠀⠉⠉⠉⠀⣀⣠⣤⠀⠀⠛⠛⠓⠀⢰⠁⣰⠇⠀⢿⠀⠀⠀⢿⠀⠀⠀⠀⠀
⠀⠀⠀⢠⡏⠀⠀⢀⡟⠈⢷⡄⠀⠀⠀⠀⡟⠋⢹⠀⠀⠀⠀⠀⢀⡟⠛⠉⠀⠀⠸⡇⠀⠀⠸⡇⠀⠀⠀⠀
⠀⠀⠀⣼⠁⠀⠀⣸⠃⠀⠀⠙⠷⣄⡀⠀⠡⣀⠆⠀⠀⢀⣠⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⣷⠀⠀⠀⢿⠀⠀⠀⠀
⠀⠀⢠⡏⠀⠀⠀⡿⠀⠀⠀⠀⠀⠈⠙⠳⠶⠦⠶⠶⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡀⠀⠀⢸⡆⠀⠀⠀
⠀⠀⣸⠃⠀⠀⢠⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣇⠀⠀⠀⢸⡄⠀⠀
⠀⠀⡿⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣇⠀⠀⠀⠘⣇⠀⠀
⠀⢸⡇⠀⠀⠀⣼⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣷⢄⠀⠀⣿⠀⠀
⠀⢸⡇⠀⢀⢴⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣷⢄⠀⠀⣿⠀⠀
⠀⢸⠃⡠⠊⣸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⡀⠑⢄⢹⡄⠀
⢠⡾⠋⢀⠞⣯⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢨⡏⠢⡀⠙⢷⡀
⢸⡧⠒⣡⡾⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣶⢌⠒⢼⣇
⢿⡠⠞⣡⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣄⠑⢤⡟
⢸⣥⣞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣻⣤⡇
⠀⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⠀`}
        </pre>
        
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 
              disabled:from-purple-400 disabled:to-indigo-500 text-white font-bold
              rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 
              focus:ring-purple-400 focus:ring-opacity-50 shadow-lg hover:shadow-xl
              relative overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-300 to-purple-300 opacity-0 
              group-hover:opacity-20 transition-opacity duration-300 ease-out"></span>
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin inline-block mr-2" />
                Generating...
              </>
            ) : (
              <>
                <span className="relative z-10">Generate City Pop Magic</span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-yellow-300 to-purple-300 
                  opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-out"></span>
              </>
            )}
          </button>
        </div>

        <div className="mt-12 flex justify-center gap-4">
          {[
            { Icon: Github, url: "https://github.com/yourusername" },
            { Icon: Twitter, url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&autoplay=1" },
            { Icon: Instagram, url: "https://www.instagram.com/leeyxmm/" },
            { Icon: Linkedin, url: "https://www.linkedin.com/in/liam-murphy-768615322/" },
            { Icon: Music, url: "https://soundcloud.com/leeyxm" }
          ].map(({ Icon, url }, index) => (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-yellow-200 transition-colors transform hover:scale-110"
            >
              <Icon className="w-6 h-6" />
            </a>
          ))}
        </div>
        
        <p className="mt-8 text-center text-sm text-purple-200 font-semibold">
          Built with love by Liam, in the light of the moon ツ 
        </p>
      </div>
    </main>
  );
}
