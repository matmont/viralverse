import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Info from "./Info";
import InfoOpenButton from "./InfoOpenButton";

const InfoSection = () => {
  const isInfoSectionOpen = useSelector(
    (state: RootState) => state.ui.infoSectionOpen
  );

  return (
    <>
      <InfoOpenButton />
      {isInfoSectionOpen && <Info />}
    </>
  );
};

export default InfoSection;
