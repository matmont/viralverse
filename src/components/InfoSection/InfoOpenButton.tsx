import { useDispatch } from "react-redux";
import { Avatar, Flex } from "@radix-ui/themes";
import { setInfoSectionOpen } from "../../store/slices/uiSlice";

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
          fallback={
            // <svg
            //   width="50%"
            //   height="50%"
            //   viewBox="0 0 15 15"
            //   fill="none"
            //   xmlns="http://www.w3.org/2000/svg"
            // >
            //   <path
            //     d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z"
            //     fill="currentColor"
            //     fill-rule="evenodd"
            //     clip-rule="evenodd"
            //   ></path>
            // </svg>
            <svg
              width="50%"
              height="50%"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <path
                fill="#ffffff"
                fill-rule="evenodd"
                d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm8-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm.01 8a1 1 0 102 0V9a1 1 0 10-2 0v5z"
              />
            </svg>
          }
        />
      </Flex>
    </>
  );
};

export default InfoOpenButton;
