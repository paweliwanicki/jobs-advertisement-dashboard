import { Navigate, Route, Routes } from "react-router-dom";
//import { HomePage } from '../pages';

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div> Homepage</div>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
