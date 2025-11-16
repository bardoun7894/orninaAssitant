import SonicWaveformHero from "@/components/ui/sonic-waveform";
import VoiceAgent from "@/components/voice-agent";

export default function Home() {
  return (
    <main className="App">
      <SonicWaveformHero>
        <VoiceAgent />
      </SonicWaveformHero>
    </main>
  );
}
