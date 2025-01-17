import { BeatLoader } from "react-spinners";
import './Loading.css'

const Loading = () => {
    return <div className="loader-container">
        <div>
            <BeatLoader />
        </div>
    </div>
}

export default Loading;