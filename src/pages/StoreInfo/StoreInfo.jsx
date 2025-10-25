import React, { useState, useEffect } from "react";
import { getAbout } from "../../services/api.js";
import DefaultSkeleton from "../../components/DefaultSkeleton/DefaultSkeleton.jsx";

function StoreInfo() {
    const [htmlContent, setHtmlContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAbout() {
            const data = await getAbout();
            setHtmlContent(data.data);
        }
        fetchAbout();
    }, []);

    const handleLoad = (e) => {
        const iframe = e.target;
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        if (iframeDoc && iframeDoc.body) {
            iframeDoc.body.style.padding = "0px 10px 200px 10px";
        }

        setLoading(false); // iframe is loaded, stop showing skeleton
    };

    return (
        <div>
            {loading && <div className="px-4"><DefaultSkeleton /></div>}

            {htmlContent && (
                <iframe
                    title="store-info"
                    srcDoc={htmlContent} // render HTML directly
                    onLoad={handleLoad}
                    style={{
                        width: "100%",
                        height: "100vh",
                        border: "none",
                        display: loading ? "none" : "block",
                    }}
                />
            )}
        </div>
    );
}

export default StoreInfo;
