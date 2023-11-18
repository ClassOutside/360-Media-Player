import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sphere } from '@react-three/drei';
import { Texture, TextureLoader, VideoTexture } from 'three';
import { setCurrentPlayThroughTime, setIsTimeUpdateLocked } from '../Slices/SkySphereSlice.tsx';
import config from '../../application.json'

const SkySphere = () => {
  const skySphereImage = useSelector((state: any) => state.skySphere.skySphereImage);
  const skySphereIsVideo = useSelector((state: any) => state.skySphere.isVideo);
  const videoPath = useSelector((state: any) => state.skySphere.VideoDirectory);
  const isPlaying = useSelector((state: any) => state.skySphere.isPlaying);
  const isTimeUpdateLocked = useSelector((state: any) => state.skySphere.isTimeUpdateLocked);
  const timeToSkipTo = useSelector((state: any) => state.skySphere.timeToSkipTo);
  const videoElementRef = useRef(null);
  const videoElementPathRef = useRef(null);
  const [texture, setTexture] = useState<Texture | VideoTexture | null>(null);
  const [isLoading, setIsLoading] = useState(true); //isLoading may appear unsed; However, removing it breaks the functionality.
  const mediaProviderURL = config.mediaProviderURL;
  const mediaProviderPort = config.mediaProviderPort;
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    if (isTimeUpdateLocked) {
      skipToNewTime(videoElementRef, timeToSkipTo)
    } else if ((skySphereIsVideo === false && videoElementRef.current !== null) || (videoElementRef.current && videoPath !== videoElementPathRef.current)) {
      clearCurrentLoadedVideo(videoElementRef, videoElementPathRef)
    }

    if (videoPath === videoElementPathRef.current && skySphereIsVideo === true) {
      playOrPauseVideo(videoElementRef, isPlaying)
    } else if (skySphereIsVideo === true) {
      const videoElement = loadSelectedVideo(document, mediaProviderURL, mediaProviderPort, videoPath, videoElementRef, videoElementPathRef, isPlaying)
      videoElement.addEventListener('timeupdate', () => handleTimeUpdate(videoElement));
    } else {
      clearCurrentLoadedVideo(videoElementRef, videoElementPathRef);
      loadSelectedImage(skySphereImage);
    }
  }, [skySphereIsVideo, videoPath, skySphereImage, isPlaying, timeToSkipTo, isTimeUpdateLocked]);

  const handleTimeUpdate = (videoElement: any) => {
    dispatch(setCurrentPlayThroughTime(videoElement.currentTime.toFixed(2)));
  };

  const clearCurrentLoadedVideo = (videoElementRef: any, videoElementPathRef: any) => {
    if (videoElementRef.current) {
      videoElementRef.current.pause();
      videoElementRef.current.removeAttribute('src');
      videoElementRef.current.load();
      videoElementPathRef.current = '';
    }
  }

  const skipToNewTime = (videoElementRef: any, timeToSkipTo: any) => {
    if (videoElementRef.current) {
      videoElementRef.current.currentTime = timeToSkipTo;
      dispatch(setIsTimeUpdateLocked(false));
    }
  }

  const playOrPauseVideo = (videoElementRef: any, isPlaying: any) => {
    if (isPlaying === true) {
      videoElementRef.current.play();
      setIsLoading(false);
    } else {
      videoElementRef.current.pause();
      setIsLoading(false);
    }
  }

  const loadSelectedVideo = (document: any, mediaProviderURL: any, mediaProviderPort: any, videoPath: any, videoElementRef: any, videoElementPathRef: any, isPlaying: any) => {
    const videoElement = document.createElement('video');

    videoElement.src = `https://${mediaProviderURL}:${mediaProviderPort}/streamVideo?path=${videoPath}`
    videoElement.crossOrigin = 'anonymous';
    videoElement.loop = true;
    videoElement.muted = false;

    videoElementRef.current = videoElement;
    videoElementPathRef.current = videoPath;

    const videoTexture = new VideoTexture(videoElement);
    videoElement.onloadeddata = () => {
      setTexture(videoTexture);
      setIsLoading(false);
      if (isPlaying) {
        videoElement.play();
      }
    };
    return videoElement;
  }

  const loadSelectedImage = (skySphereImage: any) => {
    const dataURL = `data:image/jpeg;base64,${skySphereImage}`;
    const textureLoader = new TextureLoader();
    textureLoader.load(dataURL, (loadedTexture) => {
      setTexture(loadedTexture);
      setIsLoading(false);
    });
  }

  return (
    // scale set to Mirror image in sphere
    <Sphere args={[10, 32, 32]} scale={[-1, 1, 1]}>
      {texture && (
        <meshBasicMaterial map={texture} side={2} />
      )}
    </Sphere>
  );
};

export default SkySphere;
