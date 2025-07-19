// types/index.ts
export interface ISuspect {
  id: string;
  name: string;
  profile: string;
  alibi: string;
}

export interface IEvidence {
  id: string;
  title: string;
  content: string;
}

export interface IInterrogation {
  suspect: string;
  transcript: string;
}

export interface ISolution {
  culpritId: string;
  method: string;
  motive: string;
}

export interface ICaseData {
  title: string;
  clientMessage: string;
  suspects: ISuspect[];
  evidence: IEvidence[];
  interrogations: IInterrogation[];
  solution: ISolution;
}

export interface ICaseFile {
  [key: string]: ICaseData;
}