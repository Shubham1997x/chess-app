export interface Tournament {
    id: string;
    name: string;
    timeControl: "Blitz" | "Rapid" | "Classical";
    startTime: string;
    playersJoined: number;
    maxPlayers: number;
    status: "upcoming" | "live";
  }