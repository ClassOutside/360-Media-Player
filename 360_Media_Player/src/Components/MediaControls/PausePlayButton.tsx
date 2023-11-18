import { Pause, Play } from "@coconut-xr/lucide-koestlich";
import IconButton from "../IconButton.tsx";
import { useDispatch, useSelector } from "react-redux";
import { setPlaying, setPaused } from '../../Slices/SkySphereSlice.tsx';

function PausePlayButton() {

    const isPlaying = useSelector((state: any) => state.skySphere.isPlaying);
    const dispatch = useDispatch();

    function handleClick() {
        if (isPlaying === true) {
            dispatch(setPaused())
        } else {
            dispatch(setPlaying())
        }
    }

    return (
        <IconButton onClick={handleClick}>
            {isPlaying ? (
                <Pause height={16} width={16} color="white" depth={0} />
            ) : (
                <Play height={16} width={16} color="white" depth={0} />
            )}
        </IconButton>
    )
}

export default PausePlayButton;