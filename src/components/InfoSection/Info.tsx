import { Flex, Button, Text, Callout, Link } from "@radix-ui/themes";
import { setInfoSectionOpen } from "../../store/slices/uiSlice";
import { useDispatch } from "react-redux";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import BodyIcon from "../../icons/BodyIcon";

const Info = () => {
  const dispatch = useDispatch();
  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      height="100vh"
      width="100vw"
      align="center"
      direction="column"
      justify="center"
      p="8"
      style={{ backgroundColor: "#00000044" }}
      onClick={() => dispatch(setInfoSectionOpen(false))}
    >
      <Flex
        onClick={(e) => e.stopPropagation()}
        p="4"
        style={{ backgroundColor: "white", borderRadius: 10, flex: 1 }}
        width="80%"
        height="80%"
        gap="4"
        direction="column"
        justify="between"
        align="end"
      >
        <Flex
          width="100%"
          style={{ flex: 1 }}
          overflow="auto"
          direction="column"
          gap="4"
          p="4"
        >
          <Text size="7" weight="bold">
            How to use Viral Verse
          </Text>
          <Callout.Root>
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              To learn the theory and the mathematical model under this
              simulator, please take a read at{" "}
              <Link href="https://mmont.dev/" target="_blank">
                https://mmont.dev/
              </Link>
            </Callout.Text>
          </Callout.Root>
          <Text>
            <strong>Viral Verse</strong> aims to be a little simulator to study
            how a user-defined virus spread across a toy community. The starting
            point of the simulation is indeed the ⚙️
            <em>
              <strong>City Area</strong>
            </em>
            , expressed as <em>cells-squared</em>. From this value, all the
            other demographic quantities will be computed: the number of
            individuals (here called <em>Population</em>), divided as follows:
            50% <em>Adults</em>, 25% <em>Youngs</em> and 25% <em>Elderly</em>.
            Those are gathered in <em>families</em>, each one composed of 2{" "}
            <em>adults</em>, 1 <em>young</em> and 1 <em>elder</em>. Each{" "}
            <em>family</em> will have an assigned <em>House</em> (
            <div
              style={{
                margin: "0 4px",
                display: "inline-block",
                width: 20,
                aspectRatio: 1,
                backgroundColor: "yellow",
              }}
            />
            ).
          </Text>
          <Text>
            <ul style={{ marginLeft: "4%" }}>
              <li>
                Each <em>adult</em> will go to the <em>Office</em> (
                <div
                  style={{
                    margin: "0 4px",
                    display: "inline-block",
                    width: 20,
                    aspectRatio: 1,
                    backgroundColor: "#0000FF",
                  }}
                />
                ) each morning, staying there roughly for 8 hours with other{" "}
                <em>adults</em> colleagues.
              </li>
              <li>
                Each <em>young</em> will go to the <em>School</em> (
                <div
                  style={{
                    margin: "0 4px",
                    display: "inline-block",
                    width: 20,
                    aspectRatio: 1,
                    backgroundColor: "#800080",
                  }}
                />
                ) each morning, staying there roughly for 6 hours with other{" "}
                <em>youngs</em> students.
              </li>
              <li>
                Each <em>elder</em> will stay at its house, risking being
                infected only by members of his family.
              </li>
            </ul>
          </Text>
          <Text>
            The epidemic model used in the simulation is a version of the SEIRD
            model, where each individual can be in different states: susceptible
            ( <BodyIcon color="#000000" /> ), exposed ({" "}
            <BodyIcon color="#ffc021" /> ), infected ({" "}
            <BodyIcon color="#ba2222" /> ) both asymptomatic or symptomatic, and
            immune ( <BodyIcon color="#12ff3d" /> ). Each epidemic run will
            start with an ⚙️
            <em>
              <strong>Outbreak</strong>
            </em>{" "}
            percentage, i.e., the amount of individuals that will start as{" "}
            <em>infected (asymptomatic)</em>. Furthermore, it is possible to
            select the{" "}
            <em>
              <strong>Virus</strong>
            </em>{" "}
            that will be the subject of the simulation. Note that it is possible
            to create custom <em>viruses</em> with the following customizable
            variables:
          </Text>
          <Text>
            <ul style={{ marginLeft: "4%" }}>
              <li>
                <strong>
                  <em>% Death</em>
                </strong>
                : the mortality rate of the virus.
              </li>
              <li>
                <strong>
                  <em>% Immunity</em>
                </strong>
                : when an individual recovers from the disease, it has this
                percentage to become <em>immune</em> from the virus.
              </li>
              <li>
                <strong>
                  <em>% Infection</em>
                </strong>
                : the infection rate of the virus.
              </li>
              <li>
                <strong>
                  <em>% Symptoms</em>
                </strong>
                : when the individual get infected, it has this percentage to
                develop symptoms (only the symptomatic individuals can die).
              </li>{" "}
              <li>
                <strong>
                  <em>Disease Duration (days)</em>
                </strong>
                : the average duration of the disease.
              </li>
              <li>
                <strong>
                  <em>Incubation Period (days)</em>
                </strong>
                : amount of days between the first contact to the virus and the
                first day of disease.
              </li>
            </ul>
          </Text>
          <Text>
            Finally, to conclude the epidemic simulation configuration, it is
            possible to set two different containment measures:
          </Text>
          <Text>
            <ul style={{ marginLeft: "4%" }}>
              <li>
                <strong>
                  ⚙️
                  <em>
                    <strong>Mask Usage</strong>
                  </em>
                </strong>
                : the probability that a user is defined as one that use the
                mask (and it will use it for the whole duration of the
                simulation). Please note that using the mask is not a defense
                against the virus. Instead, it will make sure that the viral
                load left on the cell by an infected one is lowered down.
              </li>
              <li>
                <strong>
                  ⚙️
                  <em>
                    <strong>Lockdown</strong>
                  </em>
                </strong>
                : the probability that a user <em>infected</em> and{" "}
                <strong>symptomatic</strong> will stay at its own house, without
                going around spreading the infection.
              </li>
            </ul>
          </Text>
          <Text>
            Now that the simulation is fully configured, it is possible to 🕹️
            <strong>Start</strong> (and 🕹️<strong>Pause</strong>). A simulation
            covers <strong>1 year</strong> of life, risulting in a not trivial
            duration of the interactive view of the process. Hence, it is
            possible to 🕹️<strong>Fast Forward</strong> the simulation to the
            end, where a user can check at the resulting 📊
            <strong>Charts</strong> of the model run (the action button near
            this <em>Info</em>'s one).
          </Text>
        </Flex>
        <Flex align="center" gap="3">
          <Button
            color="blue"
            onClick={() => {
              dispatch(setInfoSectionOpen(false));
            }}
          >
            Close
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Info;
