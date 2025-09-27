export interface VideoRecorderProps {
    recording: boolean;
    setRecording: (recording: boolean) => void;
    width: number;
    height: number;
    onVideoRecordered: (blob: Blob) => void;
}