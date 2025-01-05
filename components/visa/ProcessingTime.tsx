export interface ProcessingTimeProps {
  time: string;
}

export default function ProcessingTime({ time }: ProcessingTimeProps) {
  return (
    <div className="text-gray-600">
      <span className="font-medium">Processing time:</span> {time}
    </div>
  );
}