import './RequestFeature.css';
function RequestFeature() {

    const openInNewTab = (url) => {
        window.open(url, "_blank", "noopener,noreferrer");
      };
    return (
        <div className='feature-div'>
            <hr/>
            <p onClick={() => openInNewTab('https://forms.gle/REQrU932KMcPEMGX8')}>Request a new feature</p>
            
        </div>
    );
}

export default RequestFeature;