import { Container, Text } from "@coconut-xr/koestlich";
import { Glass, Slider } from "@coconut-xr/apfel-kruemel";
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsTimeUpdateLocked, setTimeToSkipTo } from '../../Slices/SkySphereSlice.tsx'
import MediaControls from "./MediaControls.tsx";
import { GreyPanel } from "../GreyPanel.tsx";

function Timeline() {

  const defaultDisplayDuration = "00:00";
  const defaultSliderRange = 10;
  const defaultSliderValue = 0;
  const isVideo = useSelector((state: any) => state.skySphere.isVideo);
  const duration = useSelector((state: any) => state.skySphere.duration);
  const currentPlayThroughTime = useSelector((state: any) => state.skySphere.currentPlayThroughTime);
  const [displayedDuration, setDisplayedDuration] = useState(defaultDisplayDuration);
  const [displayCurrentPlayThroughTime, setDisplayedCurrentPlayThroughTime] = useState(defaultDisplayDuration);
  const [sliderRange, setSliderRange] = useState(defaultSliderRange);
  const [sliderValue, setSliderValue] = useState(defaultSliderValue);
  const [sliderUpdating, setSliderUpdating] = useState(true);
  const [mostRecentSliderValueResponse, setMostRecentSliderValueResponse] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isVideo && duration !== 0) {
      updateVideoPlayTime(duration, currentPlayThroughTime);
    } else {
      setDefaulyPlayTime(defaultDisplayDuration);
    }
  }, [isVideo, duration, currentPlayThroughTime]);

  function formatDuration(seconds: any) {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const remainingSeconds = String(Math.floor(seconds % 60)).padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  }

  const updateVideoPlayTime = (duration: any, currentPlayThroughTime: any) => {
    const formattedDuration = formatDuration(duration);
    setDisplayedDuration(formattedDuration.toString());

    const formattedCurrentPlaythroughTime = formatDuration(currentPlayThroughTime);
    setDisplayedCurrentPlayThroughTime(formattedCurrentPlaythroughTime.toString())

    setSliderRange(duration)
    setSliderValue(currentPlayThroughTime)
  }

  const setDefaulyPlayTime = (defaultDisplayDuration: any) => {
    setDisplayedDuration(defaultDisplayDuration);
    setDisplayedCurrentPlayThroughTime(defaultDisplayDuration);
  }

  const handlePointerDown = () => {
    setSliderUpdating(false);
  }

  const handlePointerUp = () => {
    dispatch(setIsTimeUpdateLocked(true))
    dispatch(setTimeToSkipTo(mostRecentSliderValueResponse))

    setSliderUpdating(true);
  }

  const setMostRecentSliderValue = (value: any) => {
    setMostRecentSliderValueResponse(value)
  }

  return (
    <Container
      positionType="absolute"
      positionLeft={0}
      positionRight={0}
      positionBottom={-160}
      flexDirection="row"
      justifyContent="center"
    >
      <GreyPanel
        flexGrow={.69}
        flexShrink={1}
        borderRadiusTopRight={32}
        borderRadiusBottomRight={32}
        borderRadiusTopLeft={32}
        borderRadiusBottomLeft={32}
        padding={8}
        gapColumn={8}
        flexDirection="row">
        <Container flexDirection="column" gapRow={16} width={800} >
          <Container flexDirection="row" width={800} >
            <Text fontSize={14} color="white" opacity={1} horizontalAlign="left" paddingRight={710}>
              {displayCurrentPlayThroughTime}
            </Text>
            <Text fontSize={14} color="white" opacity={1} horizontalAlign="right">
              {displayedDuration}
            </Text>
          </Container>

          {sliderUpdating ? (
            <Slider
              size="md"
              value={sliderValue}
              range={sliderRange}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onValueChange={setMostRecentSliderValue}
            />
          ) : (
            <Slider
              size="md"
              range={sliderRange}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onValueChange={setMostRecentSliderValue}
            />
          )}

        </Container>
        <MediaControls />
      </GreyPanel>
    </Container >
  );
}

export default Timeline;