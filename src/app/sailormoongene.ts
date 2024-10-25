import { Midi } from '@tonejs/midi';

interface ExtendedVoicing {
  intervals: number[];
  tensions: number[];
  alterations: number[];
  category: 'citypop' | 'fusion' | 'jazz';
  weight: number;  // Likelihood of selection in different contexts
}

class EnhancedCityPopGenerator {
  private readonly voicings: Record<string, ExtendedVoicing> = {
    // Classic City Pop voicings
    maj9: {
      intervals: [0, 4, 7, 11, 14],
      tensions: [9, 13],
      alterations: [8, 15],
      category: 'citypop',
      weight: 1.0
    },
    maj7_13: {
      intervals: [0, 4, 7, 11, 21],
      tensions: [9, 13],
      alterations: [8, 15],
      category: 'citypop',
      weight: 0.8
    },
    min11: {
      intervals: [0, 3, 7, 10, 14, 17],
      tensions: [15, 22],
      alterations: [8],
      category: 'citypop',
      weight: 0.7
    },
    // Tatsuro Yamashita style voicings
    maj9_13: {
      intervals: [0, 4, 7, 11, 14, 21],
      tensions: [13, 15],
      alterations: [8, 22],
      category: 'jazz',
      weight: 0.9
    },
    // Fusion voicings
    dom7alt: {
      intervals: [0, 4, 7, 10, 15],
      tensions: [8, 14],
      alterations: [9, 13],
      category: 'fusion',
      weight: 0.5
    },
    // Mariya Takeuchi style voicings
    min9_13: {
      intervals: [0, 3, 7, 10, 14, 21],
      tensions: [15, 22],
      alterations: [8],
      category: 'jazz',
      weight: 0.6
    }
  };

  private readonly progressionTemplates = [
    // Common City Pop progressions
    { roots: [0, 5, 3, 4], weights: [1.0, 0.8, 0.7, 0.9] },    // I-VI-IV-V
    { roots: [0, 5, 1, 4], weights: [1.0, 0.7, 0.8, 0.9] },    // I-VI-II-V
    { roots: [3, 4, 0, 5], weights: [0.8, 0.9, 1.0, 0.7] },    // IV-V-I-VI
    { roots: [0, 2, 3, 4], weights: [1.0, 0.6, 0.8, 0.9] }     // I-III-IV-V
  ];

  private readonly colorTones = {
    major: [9, 13, 15, 22],     // 9th, 13th, #9, #11
    minor: [9, 11, 13, 15],     // 9th, 11th, 13th, #9
    dominant: [9, 13, 8, 15]    // 9th, 13th, b9, #9
  };

  private createRichVoicing(
    root: number,
    voicing: ExtendedVoicing,
    complexity: number,
    position: number
  ): number[] {
    const notes = new Set<number>();
    
    // Add base intervals
    voicing.intervals.forEach(interval => {
      notes.add(root + interval);
    });

    // Add tension notes based on complexity
    const tensionCount = Math.floor(complexity * 2.5);
    for (let i = 0; i < tensionCount; i++) {
      if (Math.random() < complexity) {
        const tension = voicing.tensions[Math.floor(Math.random() * voicing.tensions.length)];
        notes.add(root + tension);
      }
    }

    // Add alterations for more color
    if (Math.random() < complexity * 0.7) {
      const alteration = voicing.alterations[Math.floor(Math.random() * voicing.alterations.length)];
      notes.add(root + alteration);
    }

    // Add deep bass notes
    const bassNote = root - (Math.random() < 0.3 ? 24 : 12);
    notes.add(bassNote);

    // Spread voicing for richness
    return this.spreadVoicing(Array.from(notes), position);
  }

  private spreadVoicing(notes: number[], position: number): number[] {
    let spread = notes.slice().sort((a, b) => a - b);
    
    // Ensure good voice spacing
    for (let i = 1; i < spread.length; i++) {
      if (spread[i] - spread[i-1] < 2) {
        spread[i] += 12;
      }
    }

    // Add strategic octave doublings
    if (Math.random() < 0.4) {
      const noteToDouble = spread[Math.floor(Math.random() * spread.length)];
      spread.push(noteToDouble + 12);
    }

    // Optimize range
    spread = spread.map(note => {
      if (note < 36) return note + 12;
      if (note > 84) return note - 12;
      return note;
    });

    return spread.sort((a, b) => a - b);
  }

  private generateTensionArc(length: number): number[] {
    const phi = (1 + Math.sqrt(5)) / 2;  // Golden ratio
    const peak = Math.floor(length / phi);
    
    return Array(length).fill(0).map((_, i) => {
      const baseTension = 0.5 + 0.4 * (1 - Math.abs(i - peak) / (length / 2));
      const randomFactor = (Math.random() - 0.5) * 0.2;
      return Math.max(0.3, Math.min(0.9, baseTension + randomFactor));
    });
  }

  public generateMidiFile(): { data: Uint8Array; tempo: number; name: string } {
    const midi = new Midi();
    const track = midi.addTrack();
    
    // City Pop typical tempo range
    const tempo = 72 + Math.random() * 30;
    midi.header.setTempo(tempo);
    
    const progression = this.progressionTemplates[
      Math.floor(Math.random() * this.progressionTemplates.length)
    ];
    
    const length = 8;
    const tensionArc = this.generateTensionArc(length);
    
    let time = 0;
    let prevNotes: number[] = [];

    for (let i = 0; i < length; i++) {
      const rootIndex = i % progression.roots.length;
      const root = 60 + progression.roots[rootIndex];  // Middle C = 60
      
      // Select voicing based on position and previous chord
      const voicingKeys = Object.keys(this.voicings);
      const selectedVoicing = this.voicings[
        voicingKeys[Math.floor(Math.random() * voicingKeys.length)]
      ];
      
      const complexity = tensionArc[i];
      const notes = this.createRichVoicing(root, selectedVoicing, complexity, i);
      
      // Voice leading smoothing
      if (prevNotes.length > 0) {
        notes.forEach((note, idx) => {
          const closest = prevNotes.reduce((prev, curr) => {
            return Math.abs(curr - note) < Math.abs(prev - note) ? curr : prev;
          });
          if (Math.abs(closest - note) > 7) {
            // Adjust for smoother voice leading
            notes[idx] = note + (closest > note ? 12 : -12);
          }
        });
      }

      // Add notes with humanization
      const chordStart = time + (Math.random() - 0.5) * 0.02;  // Slight timing variation
      notes.forEach(note => {
        const velocity = Math.min(100, Math.max(60,
          85 + (Math.random() - 0.5) * 20
        ));
        
        // Slightly vary timing and duration for each note
        const noteTime = chordStart + (Math.random() - 0.5) * 0.01;
        const duration = 1.95 + (Math.random() - 0.5) * 0.1;
        
        track.addNote({
          midi: Math.max(0, Math.min(127, note)),
          time: noteTime,
          duration: duration,
          velocity: velocity / 127
        });
      });

      time += 2;
      prevNotes = notes;
    }

    return {
      data: midi.toArray(),
      tempo,
      name: `citypop-progression-${Date.now()}`
    };
  }
}

export const generateAndDownloadMidi = (): { url: string; filename: string } => {
  try {
    const generator = new EnhancedCityPopGenerator();
    const { data, tempo, name } = generator.generateMidiFile();
    
    const blob = new Blob([data], { type: 'audio/midi' });
    const url = URL.createObjectURL(blob);
    const filename = `${name}-${Math.round(tempo)}bpm.mid`;
    
    return { url, filename };
  } catch (error) {
    console.error('Error generating MIDI:', error);
    throw new Error('Failed to generate MIDI file');
  }
};