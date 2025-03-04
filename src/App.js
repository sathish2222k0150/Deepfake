import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsUpload } from "react-icons/bs";
import { CiImageOn, CiVideoOn } from "react-icons/ci";
import { DNA } from 'react-loader-spinner';
import useHover from "./hooks/useHover";

const App = () => {

    const BASEURL = 'http://localhost:4000';
    const MEET_LINK = "https://meet.google.com/dzz-eojo-cjf";

    const [videoUrl, setVideoUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const [isHover, hoverRef] = useHover();
    const [isHover2, hoverRef2] = useHover();

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setVideoUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const predict = async (endpoint) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append(endpoint === 'predictVideo' ? 'video' : 'image', selectedFile);
            
            const res = await fetch(`${BASEURL}/${endpoint}`, {
                method: "POST",
                body: formData
            });
            
            const data = await res.json();
            setResult(data);
            setLoading(false);
            
            toast.success("Predicted Successfully");
            
            if (data.result === 1) {
                window.open(MEET_LINK, "_blank");
            }
        } catch (error) {
            toast.error("API Error!");
            setLoading(false);
            console.error(error);
        }
    };

    const reset = () => {
        setVideoUrl('');
        setImageUrl('');
        setSelectedFile(null);
        setResult('');
    };

    return (
        <div>
            {!loading ? 
                <div className="min-h-screen min-w-full flex flex-col gap-3 items-center justify-center p-4 bg-[#EBEEF5]">

                    <div className="text-2xl sm:text-4xl text-center absolute top-10 inset-x-0">Deepfake Detection</div>

                    {!videoUrl && !imageUrl ? <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <div className="size-52">
                            <label ref={hoverRef} className="flex flex-col-reverse items-center justify-center gap-3 size-52 rounded-xl p-3 border-2 border-black/70 border-dashed cursor-pointer hover:scale-105 duration-150">
                                <div className="text-center text-3xl">Upload Video</div>
                                <div>{!isHover ? <CiVideoOn size={70}/> : <BsUpload size={70}/>}</div>
                                <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden"/>
                            </label>
                        </div>
                        <div className="size-52">
                            <label ref={hoverRef2} className="flex flex-col-reverse items-center justify-center gap-3 size-52 rounded-xl p-3 border-2 border-black/70 border-dashed cursor-pointer hover:scale-105 duration-150">
                                <div className="text-center text-3xl">Upload Image</div>
                                <div>{!isHover2 ? <CiImageOn size={70}/> : <BsUpload size={70}/>}</div>
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden"/>
                            </label>
                        </div>
                    </div> : null}

                    {videoUrl && <video controls className="rounded-2xl w-3/4 mt-10"><source src={videoUrl} type="video/mp4" /></video>}
                    {imageUrl && <img src={imageUrl} alt="Uploaded" className="rounded-2xl w-3/4 mt-10"/>}

                    {result && (
                        <div className="text-2xl flex items-center gap-2 mt-5">
                            Prediction Result: 
                            <span className={`font-bold ${result.result === 1 ? 'text-red-500' : result.result === 0 ? 'text-green-500' : 'text-neutral-700'}`}>
                                {result.result === 1 ? 'Real' : result.result === 0 ? 'Fake' : 'No face Detected'}
                            </span>
                        </div>
                    )}

                    <div className="flex items-center justify-center gap-2 mt-5">
                        {(videoUrl || imageUrl) && <button onClick={reset} className="rounded-xl p-3 border-2 border-black/70 border-dashed hover:scale-105 duration-150">Try another</button>}
                        {videoUrl && !result && <button onClick={() => predict('predictVideo')} className="rounded-xl p-3 border-2 border-black/70 border-dashed hover:scale-105 duration-150">Predict Video!</button>}
                        {imageUrl && !result && <button onClick={() => predict('predictImage')} className="rounded-xl p-3 border-2 border-black/70 border-dashed hover:scale-105 duration-150">Predict Image!</button>}
                    </div>
                </div> : 
                <div className="min-h-screen min-w-full flex flex-col items-center justify-center bg-[#EBEEF5]">
                    <DNA visible={true} height="200" width="200" ariaLabel="dna-loading" wrapperClass="dna-wrapper"/>
                    <h1>Be patient, It may take a while...</h1>
                </div>}
            <ToastContainer/>
        </div>
    );
}

export default App;
