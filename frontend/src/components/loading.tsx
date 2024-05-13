import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col bg-black">
      <CircularProgress />
    </div>
  );
}
