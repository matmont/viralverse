import { useDispatch } from "react-redux";
import { Avatar, Flex } from "@radix-ui/themes";
import { setInfoSectionOpen } from "../../store/slices/uiSlice";
import InfoIcon from "../../icons/InfoIcon";

const InfoOpenButton = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Flex
        align="center"
        justify="center"
        width="80px"
        style={{
          cursor: "pointer",
          borderRadius: "50%",
          aspectRatio: 1,
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
        onClick={(e) => {
          dispatch(setInfoSectionOpen(true));
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Avatar
          radius="full"
          size="6"
          color="blue"
          variant="solid"
          fallback={<InfoIcon />}
        />
      </Flex>
    </>
  );
};

export default InfoOpenButton;
